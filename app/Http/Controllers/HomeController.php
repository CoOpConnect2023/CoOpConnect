<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function showLanding()
    {
        return Inertia::render('Home/Landing');
    }
    public function showAbout()
    {
        return Inertia::render('Home/About');
    }
}

