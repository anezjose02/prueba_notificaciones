<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public static function responseApi($success = true, $message = "", $data = null): \Illuminate\Http\JsonResponse
    {
        $response = [
            'success' => $success,
            'message' => $message,
            'data' => $data,
        ];

        return response()->json($response);
    }
}
