<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tasks;
use App\Models\User;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Auth;

class TasksController extends Controller
{
    public function indexContent(Request $request){
        $data = Tasks::where('admin_id',Auth::id())
            ->where('tasks_status_id', [1,2,3,4])
            ->with(['status', 'userTo'])->get();
        $query = User::where('user_rol_id', 2)->with(['role']);
        $employees = $query->get();
        return response()->json([
            'success' => true,
            'message' => "Tasks",
            'tasks' => $data,
            'employees' => $employees
        ]);
    }

    public function completedTasksContent(Request $request){
        $data = Tasks::where('admin_id',Auth::id())
            ->with(['status'])->get();
        return response()->json([
            'success' => true,
            'message' => "Tasks",
            'tasks' => $data,
        ]);
    }

    public function upsert(Request $request, $taskId)
    {
        //dd($request);
        DB::beginTransaction();

        try {

            $defaultTasksStatus= 1;
            $tasksData = [
                'title' => $request->get('title'),
                'description' => $request->get('description'),
                'user_id' => $request->get('user_id'),
                'admin_id' => Auth::id(),
                'tasks_status_id' => $defaultTasksStatus

            ];

            $tasks = Tasks::findOrNew($taskId);
            $tasks->fill($tasksData);
            $tasks->saveOrFail();

            DB::commit();

            return response()->json([
                'success' => true,
                'title' => ($taskId == 'FAKE_ID') ? 'Tarea agregada' : 'Tarea modificada',
                'message' => ($taskId == 'FAKE_ID') ? 'Se ha agregado la tarea' : 'Se ha modificado la tarea'
            ]);

        } catch (\Exception $ex) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'title' => ($taskId == 'FAKE_ID') ? 'Error al agregar' : 'Error al modificar',
                'message' => $ex->getMessage(),
                'line' => $ex->getLine(),
                'file' => $ex->getFile()
            ]);
        }
    }

    public function changeStatus($tasksId): \Illuminate\Http\JsonResponse
    {
        DB::beginTransaction();
        try {
            $deleteStatusTasks = 5;
            $tasks = Tasks::find($tasksId);
            $tasks->tasks_status_id = $deleteStatusTasks;
            $tasks->saveOrFail();
            DB::commit();

            return response()->json([
                'success' => true,
                'title' => 'Se ha eliminado la tarea',
                //'message' => 'El usuario se ha '. ($user->active ? 'activado':'desactivado') . ' correctamente'
            ]);
        }catch (\Throwable $th){
            DB::rollback();
            return response()->json([
                'success' => false,
                'title' => 'Error',
                'message' => 'Error al eliminar la tarea',
                'errorMessage' => $th->getMessage(),
                'errorFile' => $th->getFile(),
                'errorLine' => $th->getLine()
            ]);
        }
    }


}
