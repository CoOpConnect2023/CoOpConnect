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
        // Load applications with the related user and make sure the user's email is included
        $job->load([
            'applications.user' => function ($query) {
                $query->select('id', 'name', 'email'); // Add other fields as necessary
            }
        ]);

        return new JobsResource($job);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJobsRequest $request, Jobs $job)
{
    // Retrieve request data
    $data = $request->all();

    // Map camelCase fields to snake_case based on the columnMap
    $columnMap = [
        'postingStatus' => 'posting_status',
        'jobType' => 'job_type',
        'userId' => 'user_id',
        'startDate' => 'start_date',
        'endDate' => 'end_date',
    ];

    foreach ($columnMap as $camelCase => $snakeCase) {
        // If the camelCase field exists in the request, map it to the snake_case version
        if (isset($data[$camelCase])) {
            $data[$snakeCase] = $data[$camelCase];
            unset($data[$camelCase]); // Remove the camelCase version
        }
    }

    // Update the job with the transformed data
    $job->update($data);

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

        // Get skills from request or default to the authenticated user's skills
        $userSkills = $request->input('skills');


        // Parse the skills into an array, handle cases where it's null or empty
        $userSkillsArray = $userSkills ?: auth()->user()->skills ?: [];

        $userSkillsArray = array_map('strtolower', $userSkillsArray);


        // Retrieve jobs that match the provided or user's skills
        $matchingJobs = Jobs::where(function ($query) use ($userSkillsArray) {
            foreach ($userSkillsArray as $skill) {
                $query->orWhereRaw("LOWER(skills) LIKE ?", ['%"' . strtolower($skill) . '"%']);
            }
        })->get();


        if ($matchingJobs->isEmpty()) {
            return response()->json(['message' => 'No jobs match the provided skills.'], 404);
        }

        // Return the matching jobs as JSON
        return new JobsCollection($matchingJobs);
    }

    public function searchJobs(Request $request)
    {




        $searchTerms = $request->input('searchTerm');
        $location = $request->input('location');





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
