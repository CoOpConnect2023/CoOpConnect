<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Courses;
use App\Http\Requests\V1\StoreCoursesRequest;
use App\Http\Requests\V1\UpdateCoursesRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\CoursesResource;
use App\Http\Resources\V1\CoursesCollection;
use Illuminate\Http\Request;
use App\Filters\V1\CoursesFilter;

class CoursesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new CoursesFilter();
        $filterItems = $filter->transform($request);

        $includeUsers = $request->query('includeUsers');

        $courses = Courses::where($filterItems);

        if ($includeUsers) {
            $courses = $courses->with('users');
        }

        return new CoursesCollection($courses->get());
    }

    public function getCoursesforUser($userId)
    {
        // Fetch all jobs related to the specific user
        $userJobs = Courses::whereHas('users', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->get();

        // Return the jobs as a JSON response
        return new CoursesCollection($userJobs);
    }

    public function getCoursesForTeacher($userId)
{
    $teacherCourses = Courses::where('teacher_id', $userId)
                            ->with('users') // Load users enrolled in each course
                            ->get();

    return new CoursesCollection($teacherCourses);
}

public function getCourseDocumentsForTeacher($userId)
{
    $teacherCourses = Courses::where('teacher_id', $userId)
        ->with(['users' => function ($query) {
            $query->select('users.id', 'users.name'); // Specify 'users.id' to avoid ambiguity
        }, 'users.documents' => function ($query) {
            $query->where('documents.visible', true); // Specify 'documents.visible' for clarity
        }])
        ->get();

    return new CoursesCollection($teacherCourses);
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCoursesRequest $request)
    {
        $course = Courses::create($request->validated());

        // Return the new course resource
        return new CoursesResource($course);
    }

    /**
     * Display the specified resource.
     */
    public function show(Courses $course)
    {
        return new CoursesResource($course);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCoursesRequest $request, Courses $course)
    {
        $course->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Courses $course)
    {
        $course->delete();
    }
}
