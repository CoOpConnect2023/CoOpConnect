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
use App\Mail\InterviewTimeChanged;
use App\Mail\InterviewUpdateRequest;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

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
        $data = $request->all();

        // Check if `interviewee_id` is an email
        if (filter_var($data['interviewee_id'], FILTER_VALIDATE_EMAIL)) {
            // Attempt to find the user by email
            $user = User::where('email', $data['interviewee_id'])->first();

            if (!$user) {
                // If the user does not exist, return an error response
                return response()->json([
                    'message' => 'The email provided for the interviewee does not exist.',
                ], 422);
            }

            // Replace `interviewee_id` with the user's ID
            $data['interviewee_id'] = $user->id;
        }

        // Create the interview with the resolved data
        $interview = Interviews::create($data);

        return new InterviewsResource($interview);
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
        $interview->delete();
    }


    public function sendInterviewTimeChanged(Request $request)
    {

        $validated = $request->validate([
            'student_id' => 'required|exists:users,id',
            'job_title' => 'required|string',
            'new_time' => 'required|date',
        ]);


        $student = User::findOrFail($validated['student_id']);


        Mail::to($student->email)->send(new InterviewTimeChanged($student, $validated['job_title'], $validated['new_time']));

        return response()->json(['message' => 'Interview time update email sent successfully.']);
    }

    public function sendInterviewChangeRequest(Request $request)
    {
        // Validate incoming request
        $validated = $request->validate([
            'employer_id' => 'required|exists:users,id', // Employer who will receive the email
            'student_id' => 'required|exists:users,id',  // Student who has the interview
            'job_title' => 'required|string',            // Job title for the interview
            'new_time' => 'required|date',               // New time for the interview
            'interview_id' => 'required|exists:interviews,id' // The ID of the interview being updated
        ]);

        // Fetch employer and student details
        $employer = User::findOrFail($validated['employer_id']);
        $student = User::findOrFail($validated['student_id']);

        // Update the interview with the new time
        $interview = Interviews::findOrFail($validated['interview_id']);
        $interview->proposed_time = $validated['new_time'];
        $interview->save();

        // Send email to employer
        Mail::to($employer->email)->send(new InterviewUpdateRequest(
            $employer,
            $student,                       // Pass student details
            $validated['job_title'],        // Job title
            $validated['new_time']          // New interview time
        ));

        return response()->json(['message' => 'Interview time update email sent successfully.']);
    }

}
