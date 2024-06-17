<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyJobPostingsController extends Controller
{
    public function show()
    {
        return Inertia::render('JobPostings/CompanyJobPostings');
    }
}
