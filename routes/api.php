<?php

use App\Http\Controllers\Api\V1\CoursesController;
use App\Http\Controllers\Api\V1\InterviewsController;
use App\Http\Controllers\Api\V1\JobsController;
use App\Http\Controllers\Api\V1\ReflectionsController;
use App\Http\Controllers\Api\V1\TokenController;
use App\Http\Controllers\Api\V1\UserCoursesController;
use App\Http\Controllers\Api\V1\UserJobsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessagingController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\DocumentsController;
use App\Http\Controllers\JobController;

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

Route::get('/jobs/match', [JobsController::class, 'matchSkills'])->name('jobs.match');

Route::get('/filterjobs', [JobController::class, 'filterJobs']);

Route::post('/sendmessage', [MessagingController::class, 'sendMessage']);
Route::get('/getmessages', [MessagingController::class, 'fetchMessages']);
Route::post('/createconversation', [ConversationController::class, 'createConversation']);
Route::get('/fetchconversationid', [ConversationController::class, 'fetchConversationId']);

Route::post('/uploaddocs', [DocumentsController::class, 'upload']);
Route::get('/fetchdocs', [DocumentsController::class, 'fetchDoc']);
Route::delete("/deletedoc/{doc_id}", [DocumentsController::class, "deleteDoc"]);

Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\Api\V1'], function () {
    Route::apiResource('token', TokenController::class);
    Route::get('/jobs/search', [JobsController::class, 'searchJobs'])->name('jobs.search');
    Route::get('/jobs/match', [JobsController::class, 'matchSkills'])->name('jobs.match');
    Route::apiResource('jobs', JobsController::class);
    Route::apiResource('userjobs', UserJobsController::class);
    Route::apiResource('courses', CoursesController::class);
    Route::apiResource('usercourses', UserCoursesController::class);
    Route::apiResource('reflections', ReflectionsController::class);
    Route::apiResource('interviews', InterviewsController::class);

});
