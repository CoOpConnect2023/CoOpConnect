<?php

namespace App\Http\Controllers\Api\V1;


use App\Models\Application;
use Illuminate\Http\Request;
use App\Models\Shortlist;
use App\Models\User;
use App\Models\Job;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ShortListResource;
use App\Http\Resources\V1\ShortListCollection;


class ShortlistController extends Controller
{


/**
     * Display a listing of the applications.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new ShortListCollection(ShortList::all());
    }












    public function addToShortlist(Request $request, Job $job)
{
    $request->validate([
        'applicantId' => 'required|exists:users,id',
    ]);

    $applicantId = $request->input('applicantId');
    $applicant = User::findOrFail($applicantId);

    // Check if the job already has a shortlist
    $shortlist = $job->shortlist;
    if (!$shortlist) {
        // Create a new shortlist for the job if it doesn't exist
        $shortlist = new Shortlist();
        $shortlist->job_id = $job->id;
        $shortlist->user_id = auth()->id(); // Set the user_id to the currently authenticated user
        $shortlist->save();
    }

    // Attach the applicant to the shortlist
    $shortlist->applicants()->attach($applicant);

    return response()->json(['message' => 'Applicant added to shortlist', 'shortlist' => $shortlist->applicants]);
}




public function removeFromShortlist(Job $job, User $applicant)
{
    // Find the shortlist associated with the job
    $shortlist = Shortlist::where('job_id', $job->id)->firstOrFail();

    // Detach the applicant from the shortlist
    $shortlist->applicants()->detach($applicant);

    return response()->json(['message' => 'Applicant removed from shortlist']);
}

    public function getShortlist(Job $job)
    {
        $shortlist = $job->shortlist->applicants;

        return response()->json($shortlist);
    }

    public function getShortlistsForUser($userId)
    {
        $user = User::findOrFail($userId);

        $shortlists = Shortlist::where('user_id', $user->id)
        ->with('job')
        ->with('applicants') // Eager load applicants relationship
        ->get();

        return response()->json(['shortlists' => $shortlists]);
    }

    public function deleteShortlist(Job $job)
    {
        $shortlist = $job->shortlist;

        if (!$shortlist) {
            return response()->json(['message' => 'Shortlist not found'], 404);
        }

        $shortlist->delete();

        return response()->json(['message' => 'Shortlist deleted successfully']);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // Retrieve the Shortlist with its applicants and their documents
        $shortlist = Shortlist::with('applicants.documents')->find($id);

        if (!$shortlist) {
            return response()->json(['message' => 'Shortlist not found'], Response::HTTP_NOT_FOUND);
        }

        // Return the resource
        return new ShortlistResource($shortlist);
    }


}
