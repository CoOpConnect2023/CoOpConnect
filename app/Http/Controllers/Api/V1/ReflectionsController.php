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
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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


    public function showforuser(Reflections $reflection)
    {
        $userId = Auth::id();
    $reflections = Reflections::where('user_id', $userId)->get();
    return new ReflectionsCollection($reflections);
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

    public function getReflectionsBySchool(Request $request)
{
    try {
        // Get the authenticated user's school_id
        $schoolId = auth()->user()->school_id;

        // Fetch reflections for all users in the same school
        $reflections = Reflections::whereHas('user', function ($query) use ($schoolId) {
            $query->where('school_id', $schoolId); // Filter by school_id, not user_id
        })->with('user') // Eager load user data
          ->orderBy('created_at', 'desc') // Sort by created_at
          ->get();

        return response()->json([
            'success' => true,
            'data' => $reflections,
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to fetch reflections.',
            'error' => $e->getMessage(),
        ], 500);
    }
}



}
