<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    // Display a listing of the jobs
    public function index()
    {
        // Retrieve all jobs from the database
        $jobs = Job::all();
        return view('jobs.index', compact('jobs'));
    }

    // Show the form for creating a new job
    public function create()
    {
        return view('jobs.create');
    }

    // Store a newly created job in storage
    public function store(Request $request)
    {
        // Validate incoming request
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'skills' => 'nullable|array',
            'locations' => 'required|string|max:255',
        ]);

        // Create a new job record
        $job = new Job();
        $job->title = $request->input('title');
        $job->description = $request->input('description');
        $job->skills = json_encode($request->input('skills')); // Convert skills array to JSON
        $job->locations = $request->input('locations');
        $job->user_id = auth()->id(); // Assuming user is authenticated
        $job->save();

        return redirect()->route('jobs.index')->with('success', 'Job created successfully!');
    }

    // Display the specified job
    public function show(Job $job)
    {
        return view('jobs.show', compact('job'));
    }

    // Show the form for editing the specified job
    public function edit(Job $job)
    {
        return view('jobs.edit', compact('job'));
    }

    // Update the specified job in storage
    public function update(Request $request, Job $job)
    {
        // Validate incoming request
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'skills' => 'nullable|array',
            'locations' => 'required|string|max:255',
        ]);

        // Update job record
        $job->title = $request->input('title');
        $job->description = $request->input('description');
        $job->skills = json_encode($request->input('skills')); // Convert skills array to JSON
        $job->locations = $request->input('locations');
        $job->save();

        return redirect()->route('jobs.index')->with('success', 'Job updated successfully!');
    }

    // Remove the specified job from storage
    public function destroy(Job $job)
    {
        $job->delete();
        return redirect()->route('jobs.index')->with('success', 'Job deleted successfully!');
    }

    public function matchSkills(Request $request)
    {
        // Get skills from request or default to the authenticated user's skills
        $userSkills = $request->query('skills');

        // Parse the skills into an array, handle cases where it's null or empty
        $userSkillsArray = $userSkills ? explode(',', $userSkills) : json_decode(auth()->user()->skills, true);

        // Check if userSkillsArray is null and default to an empty array if it is


        // Retrieve jobs that match the provided or user's skills
        $matchingJobs = Job::where(function ($query) use ($userSkillsArray) {
            foreach ($userSkillsArray as $skill) {
                $query->orWhereJsonContains('skills', $skill);
            }
        })->get();
        \Log::info('Matching jobs served:', $matchingJobs->toArray());

        // Return the matching jobs as JSON
        return response()->json($matchingJobs);
    }
    };




