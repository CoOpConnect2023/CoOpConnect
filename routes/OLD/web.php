<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\CompanyJobPostingsController;
use App\Http\Controllers\CreateJobPostingController;
use App\Http\Controllers\EmployerSignUpController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchJobPostingsController;
use App\Http\Controllers\TestController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MessagingController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\ContactusController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\DocumentsController;
use App\Http\Controllers\LoginProviderController;
use App\Http\Controllers\ReflectionsController;
use App\Http\Controllers\TeacherAuthController;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;



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





Route::get('/', function () {
    return Inertia::render('Landing', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/employer/viewpost/{jobId}', function ($jobId) {
    $job = Job::with(['applications.user'])->findOrFail($jobId);
    return Inertia::render('ViewPost', ['job' => $job]);
});

Route::get('/profile', [ProfileController::class, 'show'])->name('profile');




Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


});


Route::get('/dashboard', [DashboardController::class, 'show'])
    ->name('dashboard');

require __DIR__.'/auth.php';


Route::get('/profile/edit', [ProfileController::class, 'edit'])
    ->name('profile.edit')
    ->middleware('auth');




Route::get('/messaging', [MessagingController::class, 'index'])
    ->name('messaging')
    ->middleware('auth');




Route::get('/contactus', [ContactController::class, 'show'])->name('contact.show');
Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');

Route::get('/test', [TestController::class, 'show'])->name('test.show');



// Existing route for documents
Route::get('/documents', [DocumentsController::class, 'index'])->name('documents');

// Add a route for reflections
Route::get('/reflections', [ReflectionsController::class, 'index'])->name('reflections');



Route::get('/teacher/login', [TeacherAuthController::class, 'showLoginForm'])->name('teacher.login');
Route::post('/teacher/login', [TeacherAuthController::class, 'login']);


Route::post('/jobs', [JobController::class, 'store'])->name('jobs.store');


Route::middleware(['auth:sanctum'])->get('/users', [UserController::class, 'index']);

Route::group(['middleware' => ['role:admin']], function () {
    // Place your admin-only routes here
    Route::get('/admin/dashboard', 'AdminController@index')->name('admin.dashboard');
    // You can add more routes that you want to be accessible only by admins
});

Route::group(['middleware' => ['auth', 'role:admin']], function () {
    Route::get('/admin/dashboard', 'AdminController@dashboard')->name('admin.dashboard');
});

Route::get('/auth/google/redirect', [LoginProviderController::class, 'redirectToGoogle'])->name('login.google');
Route::get('/auth/google/callback', [LoginProviderController::class, 'handleGoogleCallback']);
Route::get('/auth/linkedin/redirect', [LoginProviderController::class, 'redirectToLinkedIn'])->name('login.linkedin');
Route::get('/auth/linkedin/callback', [LoginProviderController::class, 'handleLinkedInCallback']);
