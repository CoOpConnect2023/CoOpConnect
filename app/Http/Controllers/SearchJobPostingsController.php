<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchJobPostingsController extends Controller
{
    public function show()
    {
        return Inertia::render('JobPostings/SearchJobPostings');
    }
}
