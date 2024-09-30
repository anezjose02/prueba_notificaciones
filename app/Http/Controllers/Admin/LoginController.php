<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function authenticate(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $user = User::where('email', $credentials['email'])->first();
        if ($user->active === false) {
            return response()->json([
                'success' => false,
                'message' => 'Tu usuario está desactivado contacta a un administrador'
            ]);
        }

        if ($user && $user->hasRole('Administrador')) {
            if (Auth::attempt($credentials, true)) {
                $request->session()->regenerate();
                return response()->json([
                    'success' => true,
                    'message' => 'Sesión iniciada correctamente'
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Error al iniciar sesión'
                ]);
            }
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Error al iniciar sesión'
            ]);
        }
    }

    public function logout(Request $request)
    {
        \Auth::logout();
        $request->session()->flush();
        $request->session()->regenerate();
        return response()->json([
            'success' => true,
            'message' => 'se cerró la sesión'
        ]);
    }
}
