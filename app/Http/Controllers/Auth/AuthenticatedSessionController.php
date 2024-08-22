<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;


class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
{
    $user = Auth::attempt($request->only('email', 'password'));

    if ($user) {

        if (!Auth::user()->hasVerifiedEmail()) {
            Auth::logout();
            return redirect()->route('login')->withErrors(['email' => 'You need to verify your account first before logging in.']);
        }

        $request->session()->regenerate(); // Now regenerate session after verification

        Log::info("Test" . print_r(Auth::user(), true));

        // Redirect based on user role
        switch (Auth::user()->role) {
            case 'teacher':
                return redirect()->intended(RouteServiceProvider::HOME_TEACHER);
            case 'admin':
                return redirect()->intended(RouteServiceProvider::HOME_ADMIN);
            case 'employee':
                return redirect()->intended(RouteServiceProvider::HOME_EMPLOYER);
            case 'student':
            default:
                return redirect()->intended(RouteServiceProvider::HOME_STUDENT);
        }
    }

    return redirect()->route('login')->withErrors(['email' => 'Invalid login credentials.']);
}

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
