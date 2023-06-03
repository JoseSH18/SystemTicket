<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TicketController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\Auth\LoginController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::middleware('jwt.auth')->group(function () {
    Route::get('/tickets', [TicketController::class, 'index'])->name('api.tickets.index');
    Route::post('/ticket/store', [TicketController::class, 'store'])->name('api.tickets.store');
    Route::put('/ticket/assign/{id}', [TicketController::class, 'assign'])->name('api.tickets.assign');
    Route::get('/ticket/priorities', [TicketController::class, 'getPriorities'])->name('api.tickets.priorities');
    Route::get('/ticket/statuses', [TicketController::class, 'getStatuses'])->name('api.tickets.statuses');
    Route::get('/ticket/agents', [TicketController::class, 'getAgents'])->name('api.tickets.agents');
    Route::get('/ticket/tags', [TicketController::class, 'getTags'])->name('api.tickets.tags');
    Route::get('/ticket/categories', [TicketController::class, 'getCategories'])->name('api.tickets.categories');
    Route::post('/logout', [LoginController::class, 'logout'])->name('api.auth.logout');
});
Route::post('/register', [RegisterController::class, 'register'])->name('api.auth.register');
Route::post('/login', [LoginController::class, 'login'])->name('api.auth.login');

Route::get('/is-authenticated', [LoginController::class, 'isAuthenticated']);
