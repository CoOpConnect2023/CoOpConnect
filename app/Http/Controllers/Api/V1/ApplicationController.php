<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use App\Http\Requests\V1\StoreApplicationsRequest;
use App\Http\Requests\V1\UpdateApplicationsRequest;
use App\Http\Resources\V1\ApplicationResource;
use App\Http\Resources\V1\ApplicationCollection;


class ApplicationController extends Controller
{

 /**
     * Display a listing of the applications.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            // Retrieve all applications from the database
            $applications = Application::all();

            // Return a JSON response with the application collection
            return response()->json(new ApplicationCollection($applications), Response::HTTP_OK);
        } catch (\Exception $e) {
            // Handle any exceptions that occur during retrieval
            // Log the error or handle it appropriately
            return response()->json([
                'error' => 'Failed to retrieve applications',
                'message' => $e->getMessage()  // Include the actual error message for debugging
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }









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
            'jobs_id' => 'required|exists:jobs,id', // Ensure job_id exists in jobs table
            // Additional validation rules as needed
        ]);

        // Create a new application record
        $application = new Application();
        $application->user_id = auth()->id(); // Assuming user is authenticated
        $application->job_id = $request->input('jobs_id');
        // Additional fields assignment if any

        $application->save();

        // Optionally, you can return a response or redirect back with a success message
        return redirect()->back()->with('success', 'Application submitted successfully!');
    }

    // Display the specified application (if needed)
    public function show(Application $application)
    {
        return new ApplicationResource($application);
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

    public function apply(Request $request, $jobId)
    {
        $userId = Auth::id();

        // Check if the user has already applied for the job
        $existingApplication = Application::where('user_id', $userId)->where('jobs_id', $jobId)->first();
        if ($existingApplication) {
            return response()->json(['message' => 'You have already applied for this job.', 'applied' => true], 400);
        }

        // Create the application
        $application = new Application();
        $application->user_id = $userId;
        $application->jobs_id = $jobId;
        $application->save();

        return response()->json(['message' => 'Application submitted successfully.', 'applied' => false], 201);
    }

    public function checkApplication($jobId)
    {
        $userId = Auth::id();

        $existingApplication = Application::where('user_id', $userId)->where('jobs_id', $jobId)->first();
        return response()->json(['applied' => $existingApplication ? true : false]);
    }

}
