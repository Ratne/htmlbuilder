<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function(){
    Route::apiResource('modals',App\Http\Controllers\ModalController::class)->only([
        'index',
    ]);
    Route::apiResource('pages',App\Http\Controllers\PageController::class)->only([
        'update',
        'destroy'
    ]);
    Route::apiResource('media',App\Http\Controllers\MediaController::class)->only([
        'index'
    ]);
    Route::apiResource('font',App\Http\Controllers\FontController::class)->only([
        'index'
    ]);
});

Route::apiResource('media',App\Http\Controllers\MediaController::class)->only([
    'store'
]);