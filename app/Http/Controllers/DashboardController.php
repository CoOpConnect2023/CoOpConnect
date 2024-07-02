<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Job;

class DashboardController extends Controller
{
    public function show()
    {
        $jobs = Job::all(); // Fetch jobs from the database
        return Inertia::render('Dashboard', [
            'jobs' => $jobs,
        ]);
    }
}
