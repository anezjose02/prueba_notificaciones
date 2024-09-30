<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\TasksController;
use App\Http\Controllers\Admin\LoginController;

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

        Route::get('completedTasks', [TasksController::class, 'completedTasksContent'])
            ->name('completedTasks');

        Route::post('upsert/{id}', [TasksController::class, 'upsert'])
            ->name('upsert');

        Route::post('status/{id}', [TasksController::class, 'changeStatus'])
            ->name('status');
    });

Route::get('/{any}', function () {
    return view('main');
})->where('any', '.*')->name('react_routes');

