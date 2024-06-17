<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\UserJobs;
use App\Http\Requests\V1\StoreUserJobsRequest;
use App\Http\Requests\V1\UpdateUserJobsRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\UserJobsResource;
use App\Http\Resources\V1\UserJobsCollection;
use Illuminate\Http\Request;
use App\Filters\V1\UserJobsFilter;
use Illuminate\Support\Facades\Log;

class UserJobsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new UserJobsFilter();
        $filterItems = $filter->transform($request);  //[['column,', 'operator', 'value']]
        return new UserJobsCollection(UserJobs::where($filterItems)->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserJobsRequest $request)
    {
        return new UserJobsResource(UserJobs::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(UserJobs $userjob)
    {
        return new UserJobsResource($userjob);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserJobsRequest $request, UserJobs $userjob)
    {
        $userjob->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserJobs $userjob)
    {
        $userjob->delete();
    }
}
