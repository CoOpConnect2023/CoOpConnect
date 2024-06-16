<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\UserCourses;
use App\Http\Requests\V1\StoreUserCoursesRequest;
use App\Http\Requests\V1\UpdateUserCoursesRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\UserCoursesResource;
use App\Http\Resources\V1\UserCoursesCollection;
use Illuminate\Http\Request;
use App\Filters\V1\UserCoursesFilter;

class UserCoursesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new UserCoursesFilter();
        $filterItems = $filter->transform($request);  //[['column,', 'operator', 'value']]
        return new UserCoursesCollection(UserCourses::where($filterItems)->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserCoursesRequest $request)
    {
        return new UserCoursesResource(UserCourses::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(UserCourses $userCourse)
    {
        return new UserCoursesResource($userCourse);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserCoursesRequest $request, UserCourses $userCourse)
    {
        $userCourse->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserCourses $userCourse)
    {
        //
    }
}
