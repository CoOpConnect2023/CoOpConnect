<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MessagesController extends Controller
{
    public function index()
    {
        return Inertia::render('Messages/Messages');
    }
}
