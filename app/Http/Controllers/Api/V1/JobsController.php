<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Jobs;
use App\Http\Requests\V1\StoreJobsRequest;
use App\Http\Requests\V1\UpdateJobsRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\JobsResource;
use App\Http\Resources\V1\JobsCollection;
use Illuminate\Http\Request;
use App\Filters\V1\JobsFilter;
use Illuminate\Support\Facades\Log;

class JobsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Log::info('matchSkills method called.');
        $filter = new JobsFilter();
        $filterItems = $filter->transform($request);


        $includeUsers = $request->query('includeUsers');

        $jobs = Jobs::where($filterItems);

        if ($includeUsers) {
            $jobs = $jobs->with('users');
        }

        return new JobsCollection($jobs->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJobsRequest $request)
    {
        return new JobsResource(Jobs::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Jobs $job)
    {
        return new JobsResource($job);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJobsRequest $request, Jobs $job)
    {
        $job->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jobs $job)
    {
        $job->delete();
    }

    public function matchSkills(Request $request)
    {
        Log::info("Request: " . print_r($request->all(), true));
        // Get skills from request or default to the authenticated user's skills
        $userSkills = $request->input('skills');

        Log::info("Skills from Request: " . print_r($userSkills, true));
        // Parse the skills into an array, handle cases where it's null or empty
        $userSkillsArray = $userSkills ?: json_decode(auth()->user()->skills, true) ?: [];

        $userSkillsArray = array_map('strtolower', $userSkillsArray);


        // Retrieve jobs that match the provided or user's skills
        $matchingJobs = Jobs::where(function ($query) use ($userSkillsArray) {
            foreach ($userSkillsArray as $skill) {
                $query->orWhereRaw("LOWER(skills) LIKE ?", ['%"' . strtolower($skill) . '"%']);
            }
        })->get();
        Log::info('Matching jobs served:', $matchingJobs->toArray());

        if ($matchingJobs->isEmpty()) {
            return response()->json(['message' => 'No jobs match the provided skills.'], 404);
        }

        // Return the matching jobs as JSON
        return response()->json($matchingJobs);
    }

    public function searchJobs(Request $request)
    {
        $searchTerm = $request->input('searchTerm');
        $location = $request->input('location');

        $query = Jobs::query();

        if ($searchTerm) {
            $searchTerm = strtolower($searchTerm);
            $query->where(function ($q) use ($searchTerm) {
                $q->whereRaw('LOWER(title) LIKE ?', ["%{$searchTerm}%"])
                    ->orWhere(function ($q) use ($searchTerm) {
                        $q->whereRaw('JSON_CONTAINS(skills->"$[*]", JSON_QUOTE(LOWER(?)))', [$searchTerm]);
                    });
            });
        }

        // Check if $location is not empty before adding it to the query
        if (!empty($location)) {
            $location = strtolower($location);
            $query->whereRaw('LOWER(location) LIKE ?', ["%{$location}%"]);
        }

        $matchingJobs = $query->get();

        \Log::info('Search jobs served:', $matchingJobs->toArray());

        return response()->json($matchingJobs);
    }
}
