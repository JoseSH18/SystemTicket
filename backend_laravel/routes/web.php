<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('storage/{path}', function ($path) {
    $filePath = storage_path('app/public/files/' . $path);

    if (file_exists($filePath)) {
        return response()->file($filePath);
    } else {
        abort(404);
    }
})->where('path', '.*');
