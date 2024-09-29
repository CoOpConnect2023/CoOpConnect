<?php

use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginProviderController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\AdminController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\Auth\VerificationController;




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





// Landing and About pages
Route::get('/', [HomeController::class, 'showLanding'])->name('landing');
Route::get('/about', [HomeController::class, 'showAbout'])->name('about');
Route::get('/guide', [HomeController::class, 'showGuide'])->name('guide');

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/home', [AdminController::class, 'home'])->name('admin.home');

});

Route::middleware(['auth', 'student'])->group(function () {
    Route::get('/student/home', [StudentController::class, 'home'])->name('student.home');
    Route::get('/student/jobs', [StudentController::class, 'jobs'])->name('student.jobs');
    Route::get('/student/interviews', [StudentController::class, 'interviews'])->name('student.interviews');
    Route::get('/student/profile', [StudentController::class, 'profile'])->name('student.profile');
    Route::get('/student/reflections', [StudentController::class, 'reflections'])->name('student.reflections');
    Route::get('/student/myreflections', [StudentController::class, 'myreflections'])->name('student.myreflections');
    Route::get('/student/documents', [StudentController::class, 'documents'])->name('student.documents');
    Route::get('/student/settings', [StudentController::class, 'settings'])->name('student.settings');
    Route::get('/student/messages', [StudentController::class, 'messages'])->name('student.messages');
    Route::get('/student/viewapplications', [StudentController::class, 'viewapplications'])->name('student.viewapplications');
    Route::get('/student/accept-interview/{id}', [StudentController::class, 'acceptinterview'])->name('student.acceptinterview');
    Route::get('/student/viewpost/{jobId}', [StudentController::class, 'ViewPost'])->name('student.viewpost');
});

Route::middleware(['auth', 'teacher'])->group(function () {
    Route::get('/teacher/home', [TeacherController::class, 'home'])->name('teacher.home');
    Route::get('/teacher/documents', [TeacherController::class, 'documents'])->name('teacher.documents');
    Route::get('/teacher/messages', [TeacherController::class, 'messages'])->name('teacher.messages');
    Route::get('/teacher/scheduling', [TeacherController::class, 'scheduling'])->name('teacher.scheduling');
    Route::get('/teacher/profile', [TeacherController::class, 'profile'])->name('teacher.profile');
    Route::get('/teacher/settings', [TeacherController::class, 'settings'])->name('teacher.settings');
    Route::get('/teacher/classes', [TeacherController::class, 'classes'])->name('teacher.classes');
    Route::get('/teacher/students', [TeacherController::class, 'students'])->name('teacher.classes');
    Route::get('/teacher/employers', [TeacherController::class, 'employers'])->name('teacher.employers');
});

Route::middleware(['auth', 'employee'])->group(function () {
    Route::get('/employer/home', [EmployerController::class, 'home'])->name('employer.home');
    Route::get('/employer/post1', [EmployerController::class, 'post1'])->name('employer.post1');
    Route::get('/employer/post2', [EmployerController::class, 'post2'])->name('employer.post2');
    Route::get('/employer/viewpost/{jobId}', [EmployerController::class, 'ViewPost'])->name('employer.viewpost');
    Route::get('/employer/editpost1/{jobId}', [EmployerController::class, 'editPost1'])->name('employer.editpost1');
    Route::get('/employer/editpost2/{jobId}', [EmployerController::class, 'editPost2'])->name('employer.editpost2');
    Route::get('/employer/documents', [EmployerController::class, 'documents'])->name('employer.documents');
    Route::get('/employer/messages', [EmployerController::class, 'messages'])->name('employer.messages');
    Route::get('/employer/interviews', [EmployerController::class, 'interviews'])->name('employer.interviews');
    Route::get('/employer/profile', [EmployerController::class, 'profile'])->name('employer.profile');
    Route::get('/employer/settings', [EmployerController::class, 'settings'])->name('employer.settings');
    Route::get('/employer/hiredstudents', [EmployerController::class, 'hiredstudents'])->name('employer.hiredstudents');
    Route::get('/employer/viewapplicants/{jobId}', [EmployerController::class, 'viewApplicants'])->name('employer.viewapplicants');
    Route::get('/employer/accept-applicant/{id}', [EmployerController::class, 'acceptApplicant'])->name('employer.acceptapplicant');
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/dashboard', [DashboardController::class, 'show'])
    ->name('dashboard');

require __DIR__ . '/auth.php';


Route::get('/contactus', [ContactController::class, 'show'])->name('contact.show');
Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');

Route::get('/test', [TestController::class, 'show'])->name('test.show');


Route::middleware(['auth:sanctum'])->get('/users', [UserController::class, 'index']);

Route::group(['middleware' => ['role:admin']], function () {
    // Place your admin-only routes here
    Route::get('/admin/dashboard', 'AdminController@index')->name('admin.dashboard');
    // You can add more routes that you want to be accessible only by admins
});

Route::group(['middleware' => ['auth', 'role:admin']], function () {
    Route::get('/admin/dashboard', 'AdminController@dashboard')->name('admin.dashboard');
});


Route::get('/email/verify', [VerificationController::class, 'show'])->middleware('auth')->name('verification.notice');
Route::get('/email/verify/{id}/{hash}', [VerificationController::class, 'verify'])
    ->middleware(['signed'])
    ->name('verification.verify');
Route::post('/email/resend', [VerificationController::class, 'resend'])->middleware(['auth', 'throttle:6,1'])->name('verification.resend');




Route::get('/auth/google/redirect', [LoginProviderController::class, 'redirectToGoogle'])->name('login.google');
Route::get('/auth/google/callback', [LoginProviderController::class, 'handleGoogleCallback']);
Route::get('/auth/linkedin/redirect', [LoginProviderController::class, 'redirectToLinkedIn'])->name('login.linkedin');
Route::get('/auth/linkedin/callback', [LoginProviderController::class, 'handleLinkedInCallback']);
