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
use App\Http\Controllers\Api\V1\MessagesController;
use App\Http\Controllers\Api\V1\ConversationController;
use App\Http\Controllers\DocumentsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Api\V1\ApplicationController;
use App\Http\Controllers\Api\V1\ShortlistController;

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



Route::post('jobs/{job}/shortlist', [ShortlistController::class, 'addToShortlist']);
    Route::delete('/shortlists/{shortlist}/applicants/{applicant}', [ShortlistController::class, 'removeFromShortlist']);
    Route::get('/jobs/{job}/shortlist', [ShortlistController::class, 'getShortlist']);
    Route::get('/users/{userId}/shortlists', [ShortlistController::class, 'getShortlistsForUser']);
    Route::get('/shortlists/{id}', [ShortlistController::class, 'show']);
    Route::post('/jobs/{job}/shortlist/{applicant}', [ShortlistController::class, 'removeFromShortlist']);
    Route::delete('/jobs/{job}/shortlist', [ShortlistController::class, 'deleteShortlist']);

    Route::get('/applications/create', [ApplicationController::class, 'create'])->name('applications.create');
    Route::post('/applications', [ApplicationController::class, 'store'])->name('applications.store');
    Route::get('/applications/{application}', [ApplicationController::class, 'show'])->name('applications.show');
    Route::middleware('auth:sanctum')->post('/apply/{jobId}', [ApplicationController::class, 'apply']);
    Route::middleware('auth:sanctum')->get('/check-application/{jobId}', [ApplicationController::class, 'checkApplication']);
    Route::get('/jobs/user/{userId}', [JobController::class, 'getJobsByUserId']);












Route::post('/uploaddocs', [DocumentsController::class, 'upload']);
Route::get('/fetchdocs', [DocumentsController::class, 'fetchDoc']);
Route::delete("/deletedoc/{id}", [DocumentsController::class, "deleteDoc"]);

Route::get('/user-id', function () {
    return response()->json(['user' => Auth::user()]);
})->middleware('auth:sanctum');

Route::get('/download/{id}', [DocumentsController::class, 'download'])->name('file.download');

Route::post('/update-profile/{user}', [UserController::class, 'updateProfile'])->name('profile.update')->middleware('auth');
Route::get('/usersindex', [UserController::class, 'index'])->name('users.index');
Route::get('/studentStatusPercents', [UserController::class, 'getStudentStatusPercentages'])->name('users.getStudentStatusPercentages');

Route::middleware('auth:sanctum')->post('/apply/{jobId}', [ApplicationController::class, 'apply']);
Route::middleware('auth:sanctum')->get('/check-application/{jobId}', [ApplicationController::class, 'checkApplication']);
Route::get('/applications/create', [ApplicationController::class, 'create'])->name('applications.create');
Route::post('/applications', [ApplicationController::class, 'store'])->name('applications.store');
Route::get('/applications/{application}', [ApplicationController::class, 'show'])->name('applications.show');


Route::delete("/deletedoc/{doc_id}", [DocumentsController::class, "deleteDoc"]);




Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\Api\V1'], function () {
    Route::get('/jobs/user/{userId}', [JobsController::class, 'getJobsforUser']);
    Route::get('/jobs/search', [JobsController::class, 'searchJobs'])->name('jobs.search');
    Route::get('/jobs/match', [JobsController::class, 'matchSkills'])->name('jobs.match');
    Route::apiResource('jobs', JobsController::class);
    Route::apiResource('token', TokenController::class);
    Route::apiResource('userjobs', UserJobsController::class);
    Route::get('/courses/user/{userId}', [CoursesController::class, 'getCourseforUser']);
    Route::get('/courses/teacher/{userId}', [CoursesController::class, 'getCoursesForTeacher']);
    Route::get('/courses/documents/teacher/{userId}', [CoursesController::class, 'getCourseDocumentsForTeacher']);


    Route::post('jobs/{job}/shortlist', [ShortlistController::class, 'addToShortlist']);
    Route::delete('/shortlists/{shortlist}/applicants/{applicant}', [ShortlistController::class, 'removeFromShortlist']);
    Route::get('/jobs/{job}/shortlist', [ShortlistController::class, 'getShortlist']);
    Route::get('/users/{userId}/shortlists', [ShortlistController::class, 'getShortlistsForUser']);
    Route::get('/shortlists/{id}', [ShortlistController::class, 'show']);
    Route::post('/jobs/{job}/shortlist/{applicant}', [ShortlistController::class, 'removeFromShortlist']);
    Route::delete('/jobs/{job}/shortlist', [ShortlistController::class, 'deleteShortlist']);

    Route::get('/applications/create', [ApplicationController::class, 'create'])->name('applications.create');
    Route::post('/applications', [ApplicationController::class, 'store'])->name('applications.store');
    Route::get('/applications/{application}', [ApplicationController::class, 'show'])->name('applications.show');
    Route::middleware('auth:sanctum')->post('/apply/{jobId}', [ApplicationController::class, 'apply']);
    Route::middleware('auth:sanctum')->get('/check-application/{jobId}', [ApplicationController::class, 'checkApplication']);
    Route::get('/jobs/user/{userId}', [JobController::class, 'getJobsByUserId']);

    Route::post('/sendmessages', [MessagesController::class, 'store']);
    Route::post('/sendnewmessages', [MessagesController::class, 'createConversation']);
    Route::get('/conversation/{user_id}', [ConversationController::class, 'show']);
    Route::get('/conversation/{conversation_id}/messages', [ConversationController::class, 'getMessages']);
    Route::get('/conversations/{conversation_id}/current', [ConversationController::class, 'getCurrentConversation']);












    Route::apiResource('courses', CoursesController::class);
    Route::apiResource('usercourses', UserCoursesController::class);
    Route::apiResource('reflections', ReflectionsController::class);
    Route::apiResource('interviews', InterviewsController::class);
    Route::apiResource('applications', ApplicationController::class);
    Route::apiResource('shortlists', ShortListController::class);
});
