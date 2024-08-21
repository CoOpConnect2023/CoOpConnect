<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;

class VerificationController extends Controller
{
    /**
     * Mark the user's email address as verified without requiring login.
     */
    public function verify(Request $request, $id, $hash)
    {

        $user = User::findOrFail($id);


        if (! hash_equals((string) $hash, sha1($user->email))) {
            return redirect('/')->with('error', 'Invalid verification link.');
        }


        if ($user->hasVerifiedEmail()) {
            return redirect('/login')->with('status', 'Your email is already verified.');
        }


        Auth::login($user);


        $user->markEmailAsVerified();


        Auth::logout();


        return redirect('/login')->with('status', 'Your email has been verified. Please log in.');
    }

    /**
     * Resend the email verification notification.
     */
    public function resend(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect('/dashboard');
        }

        $request->user()->sendEmailVerificationNotification();

        return back()->with('status', 'verification-link-sent');
    }
}
