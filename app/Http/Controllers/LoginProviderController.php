<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;

class LoginProviderController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $google_user = Socialite::driver('google')->user();

        $this->registerOrLoginUser(($google_user));

        return redirect('/dashboard');
    }

    public function redirectToLinkedIn()
    {
        return Socialite::driver('linkedin-openid')->redirect();
    }

    public function handleLinkedInCallback()
    {
        $linkedin_user = Socialite::driver('linkedin-openid')->user();

        $this->registerOrLoginUser(($linkedin_user));

        return redirect('/dashboard');
    }

    protected function registerOrLoginUser($data)
    {
        $user = User::updateOrCreate([
            'email' => $data->email,
        ], [
            'name' => $data->name,
        ]);
        Auth::login($user);
    }
}
