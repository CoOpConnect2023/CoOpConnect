<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Job;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function show()
    {
         // Fetch the authenticated user
         $user = Auth::user();

         // Check the user's role
         if ($user->role === 'employee') {
             // If the user is an employee, render the employee dashboard
             // You should create an 'EmployeeDashboard' component in your Inertia app
             // return Inertia::render('Dashboard');

            $jobs = Job::all(); // Fetch jobs from the database
            return Inertia::render('EmployeeDashboard', [
                'jobs' => $jobs,
            ]);

         }

        else {

            $jobs = Job::all(); // Fetch jobs from the database
            return Inertia::render('Dashboard', [
                'jobs' => $jobs,
            ]);
        
    } 

    }
}
