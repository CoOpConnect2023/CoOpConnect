<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job; // Make sure to use your actual Job model namespace

class JobController extends Controller
{
    // Method to store a new job
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $job = new Job();
        $job->title = $request->title;
        $job->location = $request->location;
        $job->description = $request->description;
        $job->save();

        // Redirect back or to a specific page with a success message
        return redirect()->route('dashboard')->with('success', 'Job posted successfully.');
    }

    public function filterJobs(Request $request)
    {
        $location_filter = $request->input('location_filter');
        $keyword_filter = $request->input('keyword_filter');

        $location_filter = "$location_filter%";
        $keyword_filter = trim($keyword_filter);
        $keyword_filter = "%$keyword_filter%";

        return (Job::select('title', 'description', 'location')
        ->where('location','like',$location_filter)
        ->where(function($query) use ($keyword_filter){
            $query->where('title', 'like', $keyword_filter)
                ->orWhere('description', 'like', $keyword_filter);
            })
        )->get();
    }

}
