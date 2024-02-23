<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function showLoginForm()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            // Authentication successful
            $user = Auth::user();
            if ($user->role === 'teacher') {
                return redirect()->intended('/teacher/dashboard');
            } elseif ($user->role === 'student') {
                return redirect()->intended('/student/dashboard');
            } elseif ($user->role === 'employee') {
                return redirect()->intended('/employee/dashboard');
            }
        }

        // Authentication failed
        return redirect()->back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }
}
