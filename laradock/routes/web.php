<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

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

Auth::routes([
  'register' => false
]);

Route::middleware('cookie')->group(function () {
  Route::get('/', [App\Http\Controllers\HomeController::class, 'root'])->name('root');

  //Update User Details
  Route::post('/update-profile/{id}', [App\Http\Controllers\HomeController::class, 'updateProfile'])->name('updateProfile');
  Route::post('/update-password/{id}', [App\Http\Controllers\HomeController::class, 'updatePassword'])->name('updatePassword');

  Route::get('{any}', [App\Http\Controllers\HomeController::class, 'index'])->name('index');

  //Language Translation
  Route::get('index/{locale}', [App\Http\Controllers\HomeController::class, 'lang']);


  Route::resource('headers', App\Http\Controllers\HeaderController::class);
  Route::resource('footers', App\Http\Controllers\FooterController::class);
  Route::resource('pages', App\Http\Controllers\PageController::class);
  Route::resource('modals', App\Http\Controllers\ModalController::class);
  Route::resource('settings', App\Http\Controllers\SettingController::class);
  Route::resource('categories', App\Http\Controllers\CategoryController::class);
  Route::resource('templates', App\Http\Controllers\TemplateController::class);
});
