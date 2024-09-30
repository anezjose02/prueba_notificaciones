<?php

namespace App\Http\Controllers\Employess;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Models\Role;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;

class UserController extends Controller
{
    public function getAuthUser(Request $request){

        $query = User::whereId(Auth::id())->with(['image']);
        $data = $query->get();
        return response()->json([
            'success' => true,
            'user' => $data[0]
        ]);
    }

    public function indexContent(Request $request): \Illuminate\Http\JsonResponse
    {
        $query = User::whereId(Auth::id())->with(['image']);
        $data = $query->get();

        return response()->json([
            'success' => true,
            'message' => "Usuario encontrado",
            'users' => $data,
        ]);
    }
    public function upsert(Request $request, $userId): \Illuminate\Http\JsonResponse
    {
        try {
            DB::beginTransaction();

            $user = User::findOrNew($userId);

            $duplicateUser = User::whereEmail($request->email);

            if ($userId != 'FAKE_ID') {
                if ($duplicateUser->count() > 0 && $user->email != $request->email) {
                    return response()->json([
                        'success' => false,
                        'title' => 'Usuario duplicado',
                        'message' => 'Ya hay un usuario registrado con el correo ' . $request->email,
                        'email' => $request->email,
                    ]);
                }
            } else {
                if ($duplicateUser->count() > 0) {
                    return response()->json([
                        'success' => false,
                        'title' => 'Usuario duplicado',
                        'message' => 'Ya hay un usuario registrado con el correo ' . $request->email,
                        'email' => $request->email,
                    ]);
                }
            }

            $user->fill($request->except('password', 'confirmPassword'));

            $password = $request->get('password');
            if ($password) {
                $user->password = bcrypt($password);
            }

            $user->last_name = $request->get('last_name');
            $user->second_last_name = $request->get('second_last_name');
            $user->user_rol_id = $request->get('rol_id');
            $user->saveOrFail();

            if ($request->hasFile('profile_img')) {
                $imageName = time() . '.' . $request->file('profile_img')->getClientOriginalExtension();
                $request->file('profile_img')->move(public_path('/uploads/images/'), $imageName);

                $image = Image::findOrNew($user->image->id ?? null);
                $image->image_id = $user->id;
                $image->image_type = 'App\Models\User';
                $image->url = '/uploads/images/' . $imageName;
                $image->save();
            }

            $authUser = false;
            if ($userId != 'FAKE_ID') {
                $authUser = $userId == Auth::id();
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'authUser' => $authUser,
                'title' => ($userId == 'FAKE_ID') ? 'Usuario agregado' : 'Usuario modificado',
                'message' => ($userId == 'FAKE_ID') ? 'El Usuario ha sido agregado con éxito' : 'El Usuario ha sido modificado con éxito',
            ]);

        } catch (\Exception $ex) {
            DB::rollback();

            return response()->json([
                'success' => false,
                'title' => ($userId == 'FAKE_ID') ? 'Error al agregar usuario' : 'Error al modificar usuario',
                'message' => $ex->getMessage(),
                'line' => $ex->getLine(),
                'file' => $ex->getFile(),
            ]);
        }
    }

    public function changeStatus($userId): \Illuminate\Http\JsonResponse
    {
        DB::beginTransaction();
        try {
            $user = User::find($userId);
            $user->active = !$user->active;
            $user->saveOrFail();
            DB::commit();

            return response()->json([
                'success' => true,
                'title' => 'Se ha ' . ($user->active ? 'activado':'desactivado'). ' el usuario',
                //'message' => 'El usuario se ha '. ($user->active ? 'activado':'desactivado') . ' correctamente'
            ]);
        }catch (\Throwable $th){
            DB::rollback();
            return response()->json([
                'success' => false,
                'title' => 'Error',
                'message' => 'Error al ' . ($user->active ? 'activar':'desactivar'). 'al usuario',
                'errorMessage' => $th->getMessage(),
                'errorFile' => $th->getFile(),
                'errorLine' => $th->getLine()
            ]);
        }
    }
}
