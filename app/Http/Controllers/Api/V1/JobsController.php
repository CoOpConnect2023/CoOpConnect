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
}
