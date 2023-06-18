<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TicketController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\PriorityController;
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
    Route::post('/ticket/addComment', [TicketController::class, 'addComment'])->name('api.tickets.addComment')->middleware('can:api.tickets.addComment');

    Route::get('/categories/index', [CategoryController::class, 'index'])->name('api.categories.index')->middleware('can:api.categories.index');
    Route::post('/category/store', [CategoryController::class, 'store'])->name('api.categories.store')->middleware('can:api.categories.store');
    Route::post('/category/update/{id}', [CategoryController::class, 'update'])->name('api.categories.update')->middleware('can:api.categories.update');
    Route::get('/category/get/{id}', [CategoryController::class, 'categoryById'])->name('api.categories.categoryById')->middleware('can:api.categories.categoryById');
    Route::delete('/category/delete/{id}', [CategoryController::class, 'delete'])->name('api.categories.delete')->middleware('can:api.categories.delete');

    Route::get('/tags/index', [TagController::class, 'index'])->name('api.tags.index')->middleware('can:api.tags.index');
    Route::post('/tag/store', [TagController::class, 'store'])->name('api.tags.store')->middleware('can:api.tags.store');
    Route::post('/tag/update/{id}', [TagController::class, 'update'])->name('api.tags.update')->middleware('can:api.tags.update');
    Route::get('/tag/get/{id}', [TagController::class, 'tagById'])->name('api.tags.tagById')->middleware('can:api.tags.tagById');
    Route::delete('/tag/delete/{id}', [TagController::class, 'delete'])->name('api.tags.delete')->middleware('can:api.tags.delete');

    Route::get('/priorities/index', [PriorityController::class, 'index'])->name('api.priorities.index')->middleware('can:api.priorities.index');
    Route::post('/priority/store', [PriorityController::class, 'store'])->name('api.priorities.store')->middleware('can:api.priorities.store');
    Route::post('/priority/update/{id}', [PriorityController::class, 'update'])->name('api.priorities.update')->middleware('can:api.priorities.update');
    Route::get('/priority/get/{id}', [PriorityController::class, 'priorityById'])->name('api.priorities.priorityById')->middleware('can:api.priorities.priorityById');
    Route::delete('/priority/delete/{id}', [PriorityController::class, 'delete'])->name('api.priorities.delete')->middleware('can:api.priorities.delete');

    Route::post('/logout', [LoginController::class, 'logout'])->name('api.auth.logout')->middleware('can:api.auth.logout');
});
Route::post('/register', [RegisterController::class, 'register'])->name('api.auth.register');
Route::post('/login', [LoginController::class, 'login'])->name('api.auth.login');

Route::get('/is-authenticated', [LoginController::class, 'isAuthenticated']);
