<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessagingController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\DocumentsController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ReflectionController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/filterjobs', [JobController::class, 'filterJobs']);

Route::post('/sendmessage', [MessagingController::class, 'sendMessage']);
Route::get('/getmessages', [MessagingController::class, 'fetchMessages']);
Route::post('/createconversation', [ConversationController::class, 'createConversation']);
Route::get('/fetchconversationid', [ConversationController::class, 'fetchConversationId']);

Route::post('/uploaddocs', [DocumentsController::class, 'upload']);
Route::get('/fetchdocs', [DocumentsController::class, 'fetchDoc']);
Route::delete("/deletedoc/{id}", [DocumentsController::class, "deleteDoc"]);

Route::get('/user-id', function () {
    return response()->json(['user' => Auth::user()]);
})->middleware('auth:sanctum');

Route::get('/download/{id}', [DocumentsController::class, 'download'])->name('file.download');





Route::middleware('auth:sanctum')->group(function () {
    Route::get('/reflections', [ReflectionController::class, 'index']);
    Route::post('/reflections', [ReflectionController::class, 'store']);
    Route::put('/reflections/{id}', [ReflectionController::class, 'update']);
    Route::delete('/reflections/{id}', [ReflectionController::class, 'destroy']);
});


Route::get('/applications/create', [ApplicationController::class, 'create'])->name('applications.create');
Route::post('/applications', [ApplicationController::class, 'store'])->name('applications.store');
Route::get('/applications/{application}', [ApplicationController::class, 'show'])->name('applications.show');


Route::get('/jobs', [JobController::class, 'index'])->name('jobs.index');
Route::get('/jobs/create', [JobController::class, 'create'])->name('jobs.create');
Route::get('/jobs/match/{user_id}', [JobController::class, 'matchSkills'])->name('jobs.match')->middleware('auth');
Route::get('/jobs/search/{user_id}', [JobController::class, 'searchJobs'])
    ->name('jobs.search')
    ->middleware('auth');

Route::post('/jobs', [JobController::class, 'store'])->name('jobs.store');
Route::get('/jobs/{job}', [JobController::class, 'show'])->name('jobs.show');
Route::get('/jobs/{job}/edit', [JobController::class, 'edit'])->name('jobs.edit');
Route::put('/jobs/{job}', [JobController::class, 'update'])->name('jobs.update');
Route::delete('/jobs/{job}', [JobController::class, 'destroy'])->name('jobs.destroy');
