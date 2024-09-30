<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\LoginController;
use App\Http\Controllers\Employess\LoginController as LoginEmployess;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::prefix('auth/')
    ->name('auth.')
    ->group(function (){

        Route::post('authenticate',[LoginController::class,'authenticate'])
            ->name('authenticate');
    });

Route::prefix('login/')
    ->name('auth_employess.')
    ->group(function (){

        Route::post('authenticate',[LoginEmployess::class,'authenticate'])
            ->name('authenticate');
    });

// redirect landing
Route::get('/{any}', function () {
    return view('main');
})->where('any', '.*')->name('react_routes');



/*Route::get('/{any}', function () {
    return view('main');
})->where('any', '.*')->name('react_routes');*/
