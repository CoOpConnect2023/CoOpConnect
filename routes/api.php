<?php

use App\Http\Controllers\Api\V1\CoursesController;
use App\Http\Controllers\Api\V1\SchoolsController;
use App\Http\Controllers\Api\V1\InterviewsController;
use App\Http\Controllers\Api\V1\JobsController;
use App\Http\Controllers\Api\V1\ReflectionsController;
use App\Http\Controllers\Api\V1\TokenController;
use App\Http\Controllers\Api\V1\UserCoursesController;
use App\Http\Controllers\Api\V1\UserJobsController;
use App\Http\Controllers\Api\V1\NotificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessagingController;
use App\Http\Controllers\Api\V1\MessagesController;
use App\Http\Controllers\Api\V1\ConversationController;
use App\Http\Controllers\Api\V1\DocumentsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Api\V1\ApplicationController;
use App\Http\Controllers\Api\V1\ShortlistController;
use App\Http\Controllers\Api\V1\TeacherEmployerController;
use App\Http\Controllers\Api\V1\CompaniesController;
use App\Http\Controllers\Api\V1\UserDocumentsController;
use App\Http\Controllers\Api\V1\QuestionsController;


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













Route::get('/user-id', function () {
    // Eager load the 'company' relation
    $user = Auth::user()->load('company');

    return response()->json(['user' => $user]);
})->middleware('auth:sanctum');
Route::get('user-id/courses', [UserController::class, 'getUserId']);
Route::get('/students/teacher/{teacherId}', [UserController::class, 'getStudentsByTeacherCourses']);

Route::get('/employers/teacher/{teacherId}', [UserController::class, 'getEmployersByTeacher']);





Route::post('/update-profile/{user}', [UserController::class, 'updateProfile'])->name('profile.update')->middleware('auth');
Route::post('/update-preferences', [UserController::class, 'updatePreferences']);
Route::get('/usersindex', [UserController::class, 'index'])->name('users.index');
Route::get('/studentStatusPercents', [UserController::class, 'getStudentStatusPercentages'])->name('users.getStudentStatusPercentages');
Route::get('/users', [UserController::class, 'getAllUsers']);
Route::get('/users/students', [UserController::class, 'getAllStudents']);

Route::delete('/users/{id}', [UserController::class, 'deleteUser']);
Route::post('/upload-users', [UserController::class, 'uploadUsers']);
Route::post('/users', [UserController::class, 'store']);


Route::middleware('auth:sanctum')->post('/apply/{jobId}', [ApplicationController::class, 'apply']);
Route::middleware('auth:sanctum')->get('/check-application/{jobId}', [ApplicationController::class, 'checkApplication']);
Route::get('/applications/create', [ApplicationController::class, 'create'])->name('applications.create');
Route::post('/applications', [ApplicationController::class, 'store'])->name('applications.store');
Route::get('/applications/{application}', [ApplicationController::class, 'show'])->name('applications.show');



Route::middleware('auth:sanctum')->put('/change-password', [UserController::class, 'changePassword']);


//===================API V1====================================================
Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\Api\V1', 'middleware' => 'auth:sanctum'], function () {

    Route::apiResource('documents', DocumentsController::class);
    Route::post('/uploaddocs', [DocumentsController::class, 'upload']);
    Route::get('/fetchdocs', [DocumentsController::class, 'fetchDoc']);
    Route::delete("/deletedoc/{id}", [DocumentsController::class, "deleteDoc"]);
    Route::delete("/deletedoc/{doc_id}", [DocumentsController::class, "deleteDoc"]);
    Route::get('/download/{id}', [DocumentsController::class, 'download'])->name('file.download');
    Route::get('/userdocuments/shared-documents-with-me/{userId}', [UserDocumentsController::class, 'getDocumentsSharedWithUser']);
    Route::get('/users/{userId}/documents', [DocumentsController::class, 'getAllUserDocuments']);


    Route::post('/jobs/{jobId}/responses', [QuestionsController::class, 'storeResponses']);

    Route::get('/user-jobs', [UserJobsController::class, 'getUserJobsByStatus']);





    Route::get('/jobs/user/{userId}', [JobsController::class, 'getJobsforUser']);
    Route::get('/jobs/search', [JobsController::class, 'searchJobs'])->name('jobs.search');
    Route::get('/jobs/match', [JobsController::class, 'matchSkills'])->name('jobs.match');
    Route::apiResource('jobs', JobsController::class);
    Route::post('/jobs/jobwithquestions', [JobsController::class, 'storeJobWithQuestions']);
    Route::patch('/jobs/{job}/jobwithquestions', [JobsController::class, 'updateJobWithQuestions']);


    Route::get('/courses/user/{userId}', [CoursesController::class, 'getCourseforUser']);
    Route::get('/courses/teacher/{userId}', [CoursesController::class, 'getCoursesForTeacher']);

    Route::get('/courses/school/{userId}', [CoursesController::class, 'getUsersWithSameSchool']);

    Route::get('/courses/documents/teacher/{userId}', [CoursesController::class, 'getCourseDocumentsForTeacher']);
    Route::get('/school/{schoolId}/courses', [CoursesController::class, 'getCoursesForSchool']);
    Route::delete('usercourses/student/{studentId}', [UserCoursesController::class, 'deleteByStudentId']);


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

    Route::post('/sendmessages', [MessagesController::class, 'store']);
    Route::post('/sendnewmessages', [MessagesController::class, 'createConversation']);
    Route::get('/conversation/{user_id}', [ConversationController::class, 'show']);
    Route::get('/conversation/{conversation_id}/messages', [ConversationController::class, 'getMessages']);
    Route::get('/conversation/unreadmessages', [ConversationController::class, 'getAllMessages']);
    Route::get('/conversations/{conversation_id}/current', [ConversationController::class, 'getCurrentConversation']);
    Route::get('/messages/{user_id}', [MessagesController::class, 'getUnreadMessages']);
    Route::patch('/messages/{message_id}/mark-as-read', [MessagesController::class, 'markMessageAsRead']);
    Route::patch('/messages/{message_id}/mark-all-as-read', [MessagesController::class, 'markAllMessageAsRead']);



    Route::apiResource('notifications', NotificationController::class);
    Route::get('/notifications/unviewed', [NotificationController::class, 'getUnviewedNotifications']);
    Route::post('/notifications/send-job-application-notification', [NotificationController::class, 'sendJobApplicationNotification']);
    Route::post('/notifications/interviews/accept', [NotificationController::class, 'acceptInterview']);
    Route::post('/notifications/decline',
    [NotificationController::class, 'declineInterview']);









    Route::apiResource('schools', SchoolController::class);
    Route::apiResource('questions', QuestionsController::class);
    Route::post('/questions/{question}/response', [QuestionsController::class, 'storeResponse']);
    Route::get('/jobs/{jobId}/questions', [QuestionsController::class, 'getQuestionsByJob']);
    Route::apiResource('token', TokenController::class);
    Route::get('/userjobs/list/{jobsId}', [UserJobsController::class, 'getUserDetails'])->name('jobs.getUserDetails');
    Route::get('/userjobs/user/{userJobsId}', [UserJobsController::class, 'getSingleUserDetails'])->name('jobs.getSingleUserDetails');
    Route::get('/userjobs/jobs', [UserJobsController::class, 'getJobsDetails'])->name('jobs.getJobsDetails');
    Route::get('/userjobs/job/{userJobsId}', [UserJobsController::class, 'getSingleJobDetails'])->name('jobs.getSingleJobDetails');
    Route::get('/userjobs/interviews', [UserJobsController::class, 'getInterviews'])->name('jobs.getInterviews');
    Route::get('/userjobs/owned', [UserJobsController::class, 'getOwnedUserJobs'])->name('userjobs.getOwnedUserJobs');
    Route::patch('/userjobs/{userJobsId}/edit-hired-student', [UserJobsController::class, 'editHiredStudent']);
    Route::get('/user-jobs', [UserJobsController::class, 'getUserJobsByStatus']);

    Route::apiResource('userjobs', UserJobsController::class);
    Route::post('/send-hire-email', [NotificationController::class, 'sendHireEmail']);





    Route::apiResource('courses', CoursesController::class);
    Route::apiResource('usercourses', UserCoursesController::class);
    Route::apiResource('userdocuments', UserDocumentsController::class);
    Route::get('/userdocuments/shared-documents/{userId}', [UserDocumentsController::class, 'getSharedDocumentsForUser']);
    Route::post('/userdocuments/share', [UserDocumentsController::class, 'createUserDocumentsByEmails']);

    Route::apiResource('reflections', ReflectionsController::class);
    Route::get('/myreflections', [ReflectionsController::class, 'showforuser']);
    Route::get('/studentreflections', [ReflectionsController::class, 'getReflectionsBySchool']);

    Route::apiResource('interviews', InterviewsController::class);
    Route::post('/send-interview-time-changed', [InterviewsController::class, 'sendInterviewTimeChanged']);
    Route::post('/send-interview-time-request', [InterviewsController::class, 'sendInterviewChangeRequest']);


    Route::apiResource('applications', ApplicationController::class);
    Route::apiResource('shortlists', ShortListController::class);
    Route::apiResource('teacheremployers', TeacherEmployerController::class);
    Route::apiResource('companies', CompaniesController::class);
    Route::delete('teacheremployers/{teacherId}/{employerId}', [TeacherEmployerController::class, 'destroy']);




});
