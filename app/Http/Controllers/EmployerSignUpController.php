<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployerSignUpController extends Controller
{
    public function show()
    {
        return Inertia::render('SignUp/EmployerSignUp');
    }
}
