<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\User;
use App\Models\Company;
use Illuminate\Http\Request;
use App\Http\Requests\V1\StoreTeacherEmployerRequest;
use App\Http\Requests\V1\UpdateTeacherEmployerRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\TeacherEmployerResource;
use App\Http\Resources\V1\TeacherEmployerCollection;
use App\Filters\V1\TeacherEmployerFilter;
use App\Mail\WelcomeEmail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class TeacherEmployerController extends Controller
{
    public function index(Request $request)
{
    $filter = new TeacherEmployerFilter();
    $filterItems = $filter->transform($request);

    $includeUsers = $request->query('includeUsers');

    // Fetch teachers with the filtered employers and their associated companies
    $teachers = User::where('role', 'teacher')->where($filterItems);


    $teachers = User::with(['company', 'employers'])->get();



    return new TeacherEmployerCollection($teachers->get());
}




public function store(StoreTeacherEmployerRequest $request)
{
    Log::info('StoreTeacherEmployerRequest received', $request->all());

    $teacher = User::findOrFail($request->teacher_id);
    Log::info('Teacher found', ['teacher_id' => $teacher->id]);

    $employersData = $request->employers ?? [$request->only(['employer_email', 'employer_name', 'company_name'])];

    $attachedEmployers = [];
    $skippedEmployers = [];

    foreach ($employersData as $employerData) {
        $employer = User::where('email', $employerData['employer_email'])->first();
        Log::info('Employer lookup', ['employer_email' => $employerData['employer_email'], 'employer_exists' => $employer ? 'Yes' : 'No']);

        // Check for the company either in the provided data or existing employer's company
        if ($employer && $employer->company_id) {
            $company = Company::find($employer->company_id); // Get the company based on the existing employer's company_id
            Log::info('Company found for existing employer', ['company_id' => $company->id, 'company_name' => $company->name]);
        } else {
            // If no company is found, create a new company if provided
            $company = Company::where('name', $employerData['company_name'])->first();
            if (!$company && !empty($employerData['company_name'])) {
                $company = Company::create([
                    'name' => $employerData['company_name'],
                    'email' => $employerData['employer_email'],
                ]);
                Log::info('New company created', ['company_id' => $company->id, 'company_name' => $company->name]);
            }
        }

        // If the employer does not exist, create a new employer and associate with the company
        if (!$employer) {
            $employer = User::create([
                'name' => $employerData['employer_name'] ?? 'New Employer',
                'email' => $employerData['employer_email'],
                'role' => 'employee',
                'status' => 'working',
                'password' => bcrypt('password'),
                'class' => $teacher->class,
                'school_id' => $teacher->school_id,
                'company_id' => $company->id ?? null, // Assign the company if available
            ]);
            Log::info('New employer created', ['employer_id' => $employer->id, 'employer_email' => $employer->email]);

            Mail::to($employer->email)->send(new WelcomeEmail($employer));
            Log::info('Welcome email sent', ['employer_email' => $employer->email]);
        }

        // Check if the employer is already attached to the teacher
        if ($teacher->employers()->where('employer_id', $employer->id)->exists()) {
            Log::warning('Employer is already attached to the teacher', ['teacher_id' => $teacher->id, 'employer_id' => $employer->id]);
            $skippedEmployers[] = $employer;
            continue;
        }

        // Attach the employer to the teacher
        $teacher->employers()->syncWithoutDetaching([$employer->id]);
        Log::info('Employer attached to teacher', ['teacher_id' => $teacher->id, 'employer_id' => $employer->id]);

        $attachedEmployers[] = $employer;
    }

    return response()->json([
        'message' => count($attachedEmployers) > 0 ? 'Employer(s) added to teacher successfully' : 'No new employers added',
        'attached' => TeacherEmployerResource::collection($attachedEmployers),
        'skipped' => TeacherEmployerResource::collection($skippedEmployers),
    ], 200);
}












public function show($teacherId)
{
    // Fetch the teacher with their associated employers
    $teacher = User::where('role', 'teacher')
                   ->with('employers') // Eager-load the employers relationship
                   ->findOrFail($teacherId);

    // Return a collection of TeacherEmployerResource for the associated employers
    return TeacherEmployerResource::collection($teacher->employers);
}


    public function update(UpdateTeacherEmployerRequest $request, $teacherId)
    {
        $teacher = User::findOrFail($teacherId);
        $employerId = $request->employer_id;

        // Update or re-sync the employer-teacher relationship
        $teacher->employers()->syncWithoutDetaching([$employerId]);

        return response()->json(['message' => 'Employer-teacher relationship updated successfully']);
    }

    public function destroy($teacherId, $employerId)
{
    // Find the teacher by ID
    $teacher = User::findOrFail($teacherId);

    // Find the employer by ID (to return it after detaching)
    $employer = User::findOrFail($employerId);

    // Detach the employer from the teacher
    $teacher->employers()->detach($employerId);

    // Return a consistent data array response
    return response()->json([
        'message' => 'Employer removed from teacher successfully',
        'data' => new TeacherEmployerResource($employer),
    ], 200);
}
}
