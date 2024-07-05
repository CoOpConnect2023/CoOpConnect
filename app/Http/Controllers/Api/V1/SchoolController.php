<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\School;
use App\Http\Requests\V1\StoreSchoolRequest;
use App\Http\Requests\V1\UpdateSchoolRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\SchoolResource;
use App\Http\Resources\V1\SchoolCollection;
use App\Filters\V1\SchoolFilter;
use Illuminate\Http\Request;

class SchoolController extends Controller
{
    public function index(Request $request)
    {
        $filter = new SchoolFilter();
        $filterItems = $filter->transform($request);

        $includeUsers = $request->query('includeUsers');

        $schools = School::where($filterItems);

        if ($includeUsers) {
            $schools = $schools->with('users');
        }

        return new SchoolCollection($schools->get());
    }

    public function store(StoreSchoolRequest $request)
    {
        $school = School::create($request->validated());

        return new SchoolResource($school);
    }

    public function show(School $school)
    {
        return new SchoolResource($school);
    }

    public function update(UpdateSchoolRequest $request, School $school)
    {
        $school->update($request->validated());

        return new SchoolResource($school);
    }

    public function destroy(School $school)
    {
        $school->delete();

        return response()->json(null, 204);
    }
}
