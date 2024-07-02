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
use App\Http\Controllers\DocumentsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ApplicationController;

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
    Route::apiResource('courses', CoursesController::class);
    Route::apiResource('usercourses', UserCoursesController::class);
    Route::apiResource('reflections', ReflectionsController::class);
    Route::apiResource('interviews', InterviewsController::class);
});
