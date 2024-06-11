<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherController extends Controller
{
    public function home()
    {
        return Inertia::render('Teacher/Home');
    }

    public function documents()
    {
        return Inertia::render('Teacher/Document');
    }

    public function messages()
    {
        return Inertia::render('Teacher/Messages');
    }

    public function scheduling()
    {
        return Inertia::render('Teacher/Scheduling');
    }

    public function profile()
    {
        return Inertia::render('Teacher/Profile');
    }

    public function settings()
    {
        return Inertia::render('Teacher/Settings');
    }
}
