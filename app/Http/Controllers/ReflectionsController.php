<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ReflectionsController extends Controller
{
    public function index()
    {
        return Inertia::render('ReflectionsPage');
    }
}