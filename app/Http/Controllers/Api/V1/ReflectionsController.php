<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Reflections;
use App\Http\Requests\V1\StoreReflectionsRequest;
use App\Http\Requests\V1\UpdateReflectionsRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ReflectionsResource;
use App\Http\Resources\V1\ReflectionsCollection;
use Illuminate\Http\Request;
use App\Filters\V1\ReflectionsFilter;

class ReflectionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new ReflectionsFilter();
        $filterItems = $filter->transform($request);  //[['column,', 'operator', 'value']]
        return new ReflectionsCollection(Reflections::where($filterItems)->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReflectionsRequest $request)
    {
        return new ReflectionsResource(Reflections::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Reflections $reflection)
    {
        return new ReflectionsResource($reflection);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReflectionsRequest $request, Reflections $reflection)
    {
        $reflection->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reflections $reflection)
    {
        $reflection->delete();
    }
}
