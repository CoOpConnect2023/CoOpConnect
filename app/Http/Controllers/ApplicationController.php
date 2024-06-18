<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    // Show the form for creating a new application
    public function create()
    {
        // Logic to show application form (if needed)
    }

    // Store a newly created application in storage
    public function store(Request $request)
    {
        // Validate incoming request
        $request->validate([
            'job_id' => 'required|exists:jobs,id', // Ensure job_id exists in jobs table
            // Additional validation rules as needed
        ]);

        // Create a new application record
        $application = new Application();
        $application->user_id = auth()->id(); // Assuming user is authenticated
        $application->job_id = $request->input('job_id');
        // Additional fields assignment if any

        $application->save();

        // Optionally, you can return a response or redirect back with a success message
        return redirect()->back()->with('success', 'Application submitted successfully!');
    }

    // Display the specified application (if needed)
    public function show(Application $application)
    {
        // Logic to show a specific application
    }

    // Show the form for editing the specified application (if needed)
    public function edit(Application $application)
    {
        // Logic to show edit form
    }

    // Update the specified application in storage (if needed)
    public function update(Request $request, Application $application)
    {
        // Logic to update application details
    }

    // Remove the specified application from storage (if needed)
    public function destroy(Application $application)
    {
        // Logic to delete application
    }
}
