<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DocumentsController extends Controller
{
    public function index()
    {
        return Inertia::render('DocumentsPage');
    }
}

