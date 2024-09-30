<?php

namespace App\Http\Controllers\Employess;

use App\Http\Controllers\Controller;
use App\Models\Tasks;
use App\Models\User;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Auth;

class TasksController extends Controller
{
    public function indexContent(Request $request){
        $data = Tasks::where('user_id',Auth::id())
            ->whereIn('tasks_status_id', [1,2,3,4])
            ->with(['status', 'userFrom'])->get();
        return response()->json([
            'success' => true,
            'message' => "Tasks",
            'tasks' => $data,
        ]);
    }

    public function tasksContent(Request $request){
        $data = Tasks::where('user_id',Auth::id())
            ->whereIn('tasks_status_id', [1])
            ->with(['status', 'userFrom'])->get();
        return response()->json([
            'success' => true,
            'message' => "Tasks",
            'tasks' => $data,
        ]);
    }

    public function completedTasksContent(Request $request){
        $data = Tasks::where('user_id',Auth::id())
            ->with(['status', 'userFrom'])->get();
        return response()->json([
            'success' => true,
            'message' => "Tasks",
            'tasks' => $data,
        ]);
    }

    public function changeStatus(Request $request, $taskId): \Illuminate\Http\JsonResponse
    {
        DB::beginTransaction();
        try {

            $tasks = Tasks::find($taskId);
            $tasks->tasks_status_id = $request->get('status');
            $tasks->saveOrFail();
            DB::commit();

            return response()->json([
                'success' => true,
                'title' => 'Se ha actualizado el estado de la tarea',
            ]);
        }catch (\Throwable $th){
            DB::rollback();
            return response()->json([
                'success' => false,
                'title' => 'Error',
                'message' => 'Error al actualizar la tarea',
                'errorMessage' => $th->getMessage(),
                'errorFile' => $th->getFile(),
                'errorLine' => $th->getLine()
            ]);
        }
    }

    public function changeStatusDelete($tasksId): \Illuminate\Http\JsonResponse
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
