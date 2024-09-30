<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Employess\UserController;
use App\Http\Controllers\Employess\TasksController;
use App\Http\Controllers\Employess\LoginController;

Route::post('logout', [LoginController::class, 'logout'])
    ->name('auth.logout');

/*************** USERS *********************/
Route::prefix('users/')
    ->name('users.')
    ->group(function () {
        Route::get('index', [UserController::class, 'indexContent'])
            ->name('index_content');

        Route::post('upsert/{id}', [UserController::class, 'upsert'])
            ->name('upsert');

        Route::post('status/{id}', [UserController::class, 'changeStatus'])
            ->name('status');

        Route::get('auth-user', [UserController::class, 'getAuthUser'])
            ->name('getAuthUser');
    });

/*************** TASKS *********************/
Route::prefix('tasks/')
    ->name('tasks.')
    ->group(function () {
        Route::get('index', [TasksController::class, 'indexContent'])
            ->name('index_content');

        Route::get('tasks', [TasksController::class, 'tasksContent'])
            ->name('tasks');

        Route::get('completedTasks', [TasksController::class, 'completedTasksContent'])
            ->name('completedTasks');

        Route::post('status/{id}', [TasksController::class, 'changeStatus'])
            ->name('status');

        Route::post('status_delete/{id}', [TasksController::class, 'changeStatusDelete'])
            ->name('status_delete');
    });

Route::get('/{any}', function () {
    return view('main');
})->where('any', '.*')->name('react_routes');

