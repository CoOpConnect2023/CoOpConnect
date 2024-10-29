<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\UserDocument;
use App\Models\Document;
use App\Models\User;
use App\Http\Requests\V1\StoreUserDocumentsRequest;
use App\Http\Requests\V1\UpdateUserDocumentsRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\UserDocumentsResource;
use App\Http\Resources\V1\UserDocumentsCollection;
use Illuminate\Http\Request;
use App\Filters\V1\UserDocumentsFilter;

class UserDocumentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new UserDocumentsFilter();
        $filterItems = $filter->transform($request);
        return new UserDocumentsCollection(UserDocument::where($filterItems)->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserDocumentsRequest $request)
    {
        $userDocument = UserDocument::create($request->all());

        return new UserDocumentsResource($userDocument);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
{
    $userDocument = UserDocument::find($id);

    if (!$userDocument) {
        return response()->json(['error' => 'Document not found'], 404);
    }

    return new UserDocumentsResource($userDocument);
}
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserDocumentsRequest $request, UserDocument $userDocument)
    {
        $userDocument->update($request->all());

        return new UserDocumentsResource($userDocument);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
{
    $userDocument = UserDocument::find($id);

    if (!$userDocument) {
        return response()->json(['error' => 'Document not found'], 404);
    }

    // Capture the deleted resource data before deletion
    $deletedDocument = new UserDocumentsResource($userDocument);

    // Delete the document
    $userDocument->delete();

    // Return the deleted document data
    return response()->json([
        'message' => 'Document deleted successfully',
        'document' => $deletedDocument
    ], 200);
}


public function getSharedDocumentsForUser($documentID)
{
    // Fetch the documents shared with the given user
    $sharedDocuments = UserDocument::where('document_id', $documentID)
        ->with('user') // Assuming UserDocument model has a 'document' relationship
        ->get();

    // Return the shared documents as a resource or as a plain JSON response
    return response()->json([
        'message' => 'Shared documents fetched successfully',
        'documents' => $sharedDocuments,
    ]);
}

public function getDocumentsSharedWithUser($userId)
{
    // Fetch the documents shared with the given user and ensure the document is visible
    $sharedDocuments = UserDocument::where('user_id', $userId) // Assuming 'user_id' is the field in UserDocument
        ->whereHas('document', function($query) {
            $query->where('visible', true); // Ensure document visibility is true
        })
        ->with(['document.user' => function($query) {
            $query->select('id', 'email'); // Load only the user ID and email
        }])
        ->get();

    // Return the shared documents as a resource or as a plain JSON response
    return response()->json([
        'message' => 'Shared documents fetched successfully',
        'documents' => $sharedDocuments,
    ]);
}




public function createUserDocumentsByEmails(Request $request)
{
    $validatedData = $request->validate([
       'emails' => ['nullable', 'array'],
        'emails.*' => ['nullable', 'email', 'exists:users,email'], // Allow empty array
        'document_id' => ['required', 'exists:documents,id'],
    ]);

    $emails = $validatedData['emails'];
    $documentId = $validatedData['document_id'];

    // If the emails array is empty, delete all user-document entries for the document
    if (empty($emails)) {
        UserDocument::where('document_id', $documentId)->delete();

        return response()->json([
            'message' => 'All user-document entries removed for this document',
            'data' => [] // Return an empty list of emails
        ], 200);
    }

    // Get the list of user IDs corresponding to the provided emails
    $users = User::whereIn('email', $emails)->get();
    $newUserIds = $users->pluck('id')->toArray(); // Get user IDs from the new list of emails

    // Get the current user-document entries for the given document
    $currentUserDocuments = UserDocument::where('document_id', $documentId)->get();
    $currentUserIds = $currentUserDocuments->pluck('user_id')->toArray(); // Extract current user IDs

    // 1. Delete entries that are no longer in the new list of emails
    $userIdsToDelete = array_diff($currentUserIds, $newUserIds); // Users that need to be removed
    if (!empty($userIdsToDelete)) {
        UserDocument::where('document_id', $documentId)
            ->whereIn('user_id', $userIdsToDelete)
            ->delete();
    }

    // 2. Create new entries for users not currently associated with the document
    $userIdsToAdd = array_diff($newUserIds, $currentUserIds); // Users that need to be added
    foreach ($userIdsToAdd as $userId) {
        UserDocument::create([
            'user_id' => $userId,
            'document_id' => $documentId,
        ]);
    }

    // Fetch the updated list of shared users
    $updatedUserDocuments = UserDocument::where('document_id', $documentId)->with('user')->get();
    $updatedEmails = $updatedUserDocuments->pluck('user.email'); // Extract updated emails

    return response()->json([
        'message' => 'User documents updated successfully for shared users',
        'data' => $updatedEmails // Return the updated email list
    ], 201);
}



}
