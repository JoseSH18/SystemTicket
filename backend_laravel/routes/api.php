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
    Route::get('/tickets', [TicketController::class, 'index'])->name('api.tickets.index')->middleware('can:api.tickets.index');
    Route::post('/ticket/store', [TicketController::class, 'store'])->name('api.tickets.store')->middleware('can:api.tickets.store');
    Route::post('/ticket/update/{id}', [TicketController::class, 'update'])->name('api.tickets.update')->middleware('can:api.tickets.update');
    Route::get('/ticket/get/{id}', [TicketController::class, 'ticketById'])->name('api.tickets.ticketById')->middleware('can:api.tickets.ticketById');
    Route::put('/ticket/assign/{id}', [TicketController::class, 'assign'])->name('api.tickets.assign')->middleware('can:api.tickets.assign');
    Route::delete('/ticket/delete/{id}', [TicketController::class, 'delete'])->name('api.tickets.delete')->middleware('can:api.tickets.delete');
    Route::get('/ticket/priorities', [TicketController::class, 'getPriorities'])->name('api.tickets.priorities')->middleware('can:api.tickets.priorities');
    Route::get('/ticket/statuses', [TicketController::class, 'getStatuses'])->name('api.tickets.statuses')->middleware('can:api.tickets.statuses');
    Route::get('/ticket/agents', [TicketController::class, 'getAgents'])->name('api.tickets.agents')->middleware('can:api.tickets.agents');
    Route::get('/ticket/tags', [TicketController::class, 'getTags'])->name('api.tickets.tags')->middleware('can:api.tickets.tags');
    Route::get('/ticket/categories', [TicketController::class, 'getCategories'])->name('api.tickets.categories')->middleware('can:api.tickets.categories');
    Route::post('/logout', [LoginController::class, 'logout'])->name('api.auth.logout')->middleware('can:api.auth.logout');
    Route::post('/ticket/addComment', [TicketController::class, 'addComment'])->name('api.tickets.addComment')->middleware('can:api.tickets.addComment');
});
Route::post('/register', [RegisterController::class, 'register'])->name('api.auth.register');
Route::post('/login', [LoginController::class, 'login'])->name('api.auth.login');

Route::get('/is-authenticated', [LoginController::class, 'isAuthenticated']);
