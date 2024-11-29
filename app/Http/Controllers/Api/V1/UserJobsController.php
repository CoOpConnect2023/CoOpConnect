<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\UserJobs;
use App\Models\User;
use App\Http\Requests\V1\StoreUserJobsRequest;
use App\Http\Requests\V1\UpdateUserJobsRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\UserJobsResource;
use App\Http\Resources\V1\UserJobsCollection;
use Illuminate\Http\Request;
use App\Filters\V1\UserJobsFilter;

class UserJobsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new UserJobsFilter();
        $filterItems = $filter->transform($request);
        return new UserJobsCollection(UserJobs::where($filterItems)->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserJobsRequest $request)
    {
        $userJob = UserJobs::create($request->all());

        return new UserJobsResource($userJob);
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

        return new UserJobsResource($userjob);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserJobs $userjob)
    {
        $userjob->delete();
    }

    public function getUserDetails($jobsId)
{
    $userJobs = UserJobs::where('jobs_id', $jobsId)->with('document')->get(); // Load the related document

    $users = $userJobs->map(function ($userJob) {
        return [
            'id' => $userJob->id,
            'name' => $userJob->user->name,
            'email' => $userJob->user->email,
            'resume' => $userJob->resume,
            'status' => $userJob->status,
            'timeSlots' => $userJob->time_slots,
            'startDate' => $userJob->start_date,
            'endDate' => $userJob->end_date,
            'userId' => $userJob->user_id,
            'documentId' => $userJob->document_id,
            'document' => $userJob->document ? [
                'id' => $userJob->document->id,
                'title' => $userJob->document->title,
                'path' => $userJob->document->path,
                'type' => $userJob->document->type,
            ] : null, // Include document details if available
        ];
    });

    return response()->json($users);
}


    public function getSingleUserDetails($userJobsId)
    {
        $userJob = UserJobs::find($userJobsId);

        if (!$userJob) {
            return response()->json(['error' => 'User job not found'], 404);
        }

        $userDetails = [
            'id' => $userJob->user->id,
            'name' => $userJob->user->name,
            'email' => $userJob->user->email,
            'resume' => $userJob->resume,
            'status' => $userJob->status,
            'startDate' => $userJob->start_date,
            'endDate' => $userJob->end_date,
        ];

        return response()->json($userDetails);
    }

    public function getJobsDetails()
    {
        $userId = auth()->user()->id;
        $userJobs = UserJobs::where('user_id', $userId)->get();

        $jobs = $userJobs->map(function ($userJob) {
            return [
                'id' => $userJob->id,
                'title' => $userJob->job->title,
                'description' => $userJob->job->description,
                'location' => $userJob->job->location,
                'company' => $userJob->job->company,
                'status' => $userJob->status,
                'timeSlots' => $userJob->time_slots,
                'startDate' => $userJob->start_date,
                'endDate' => $userJob->end_date,
            ];
        });

        return response()->json($jobs);
    }

    public function getSingleJobDetails($userJobsId)
    {
        $userJob = UserJobs::find($userJobsId);

        if (!$userJob) {
            return response()->json(['error' => 'User job not found'], 404);
        }

        $jobDetails = [
            'title' => $userJob->job->title,
            'description' => $userJob->job->description,
            'location' => $userJob->job->location,
            'company' => $userJob->job->company,
            'timeSlots' => $userJob->time_slots,
            'message' => $userJob->message,
            'startDate' => $userJob->start_date,
            'endDate' => $userJob->end_date,
            'userId' => $userJob->job->user_id,
            'userEmail' => $userJob->job->user->email,
        ];

        return response()->json($jobDetails);
    }

    public function getInterviews()
    {
        $userId = auth()->user()->id;
        $userJobs = UserJobs::where('user_id', $userId)->where('status', 'Scheduled')->get();

        $jobs = $userJobs->map(function ($userJob) {
            return [
                'id' => $userJob->id,
                'title' => $userJob->job->title,
                'description' => $userJob->job->description,
                'location' => $userJob->job->location,
                'company' => $userJob->job->company,
                'status' => $userJob->status,
                'timeSlots' => $userJob->time_slots,
                'startDate' => $userJob->start_date,
                'endDate' => $userJob->end_date,
            ];
        });

        return response()->json($jobs);
    }

    public function getOwnedUserJobs(Request $request)
    {
        $userId = auth()->user()->id;

        // Retrieve only the jobs where the status is 'Hired'
        $userJobs = UserJobs::whereHas('job', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })
        ->where('status', 'Hired') // Filter by status 'Hired'
        ->with(['job.company', 'user.school', 'document']) // Eager load the job and user relationships
        ->get();

        return response()->json($userJobs);
    }

    public function editHiredStudent(Request $request, $id)
{
    // Validate the incoming data
    $validatedData = $request->validate([
        'email' => 'required|email',
        'job_title' => 'required|string',
        'start_date' => 'required|date',
        'end_date' => 'nullable|date',
        'status' => 'required|string',
    ]);

    // Find the UserJob by its ID
    $userJob = UserJobs::findOrFail($id);

    // Find the user by email, if exists
    $user = User::where('email', $validatedData['email'])->first();
    if ($user) {
        // If the user exists, update the user ID in the UserJobs model
        $userJob->user_id = $user->id;
    }

    // Update the associated job details (title, start_date, end_date)
    $job = $userJob->job;
    $job->title = $validatedData['job_title'];
    $job->start_date = $validatedData['start_date'];
    $job->end_date = $validatedData['end_date'];
    $job->save();

    // Update the UserJob model with the new data (status, time_slots, message)
    $userJob->update([
        'start_date' => $validatedData['start_date'],
        'end_date' => $validatedData['end_date'],
        'status' => $validatedData['status'],
        'time_slots' => $request->time_slots,
        'message' => $request->message
    ]);

    // Return a success response with the updated UserJob
    return response()->json(['message' => 'Hired student and job updated successfully', 'userJob' => $userJob], 200);
}



public function getUserJobsByStatus(Request $request)
{
    // Retrieve job IDs from the query string
    $jobIds = $request->query('job_ids');

    // Validate if job IDs were provided as an array
    if (is_array($jobIds) && !empty($jobIds)) {
        // Retrieve user jobs where job ID is in the specified array and status is 'Pending' or 'Interview'
        $userJobs = UserJobs::whereIn('jobs_id', $jobIds)
            ->whereIn('status', ['Pending', 'Interview'])
            ->with(['job.company', 'user.school']) // Eager load related job and user data
            ->get();

        return response()->json($userJobs);
    } else {
        return response()->json(['error' => 'No valid job IDs provided'], 400);
    }
}







}

