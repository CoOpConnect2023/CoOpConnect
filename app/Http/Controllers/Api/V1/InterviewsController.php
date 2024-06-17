<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Interviews;
use App\Http\Requests\V1\StoreInterviewsRequest;
use App\Http\Requests\V1\UpdateInterviewsRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\InterviewsResource;
use App\Http\Resources\V1\InterviewsCollection;
use Illuminate\Http\Request;
use App\Filters\V1\InterviewsFilter;

class InterviewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new InterviewsFilter();
        $filterItems = $filter->transform($request);  //[['column,', 'operator', 'value']]
        return new InterviewsCollection(Interviews::where($filterItems)->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInterviewsRequest $request)
    {
        return new InterviewsResource(Interviews::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Interviews $interview)
    {
        return new InterviewsResource($interview);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInterviewsRequest $request, Interviews $interview)
    {
        $interview->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Interviews $interview)
    {
        //
    }
}
