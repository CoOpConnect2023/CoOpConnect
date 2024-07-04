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
        $filter = new JobsFilter();
        $filterItems = $filter->transform($request);


        $includeUsers = $request->query('includeUsers');

        $jobs = Jobs::where($filterItems);

        if ($includeUsers) {
            $jobs = $jobs->with('users');
        }

        return new JobsCollection($jobs->get());
    }

    public function getJobsforUser($userId)
    {
        // Fetch all jobs related to the specific user
        $userJobs = Jobs::whereHas('users', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->get();

        // Return the jobs as a JSON response
        return new JobsCollection($userJobs);
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
        $job->load('applications.user');
        return new JobsResource($job);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJobsRequest $request, Jobs $job)
    {
        $job->update($request->all());

        return new JobsResource($job);
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
        $userSkillsArray = $userSkills ?: auth()->user()->skills ?: [];

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
        return new JobsCollection($matchingJobs);
    }

    public function searchJobs(Request $request)
    {

        Log::info('Full Request:', ['request' => request()->all()]);


        $searchTerms = $request->input('searchTerm');
        $location = $request->input('location');

        Log::info('Received Search Term:', ['searchTerm' => $searchTerms]);
        Log::info('Received Location:', ['location' => $location]);



        $query = Jobs::query();

        if ($searchTerms) {
            $query->where(function ($q) use ($searchTerms) {
                foreach ($searchTerms as $searchTerm) {
                    $searchTerm = strtolower($searchTerm);
                    $q->orWhere(function ($q) use ($searchTerm) {
                        $q->whereRaw('LOWER(title) LIKE ?', ["%{$searchTerm}%"])
                            ->orWhere(function ($q) use ($searchTerm) {
                                $q->whereRaw('JSON_SEARCH(LOWER(skills), "one", LOWER(?)) IS NOT NULL', [$searchTerm]);
                            });
                    });
                }
            });
        }

        // Check if $location is not empty before adding it to the query
        if (!empty($location)) {
            $location = strtolower($location);
            $query->whereRaw('LOWER(location) LIKE ?', ["%{$location}%"]);
        }

        $matchingJobs = $query->get();

        return new JobsCollection($matchingJobs);
    }
}
