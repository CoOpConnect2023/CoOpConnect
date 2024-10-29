<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Document;
use App\Http\Requests\V1\StoreDocumentsRequest;
use App\Http\Requests\V1\UpdateDocumentsRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\DocumentsResource;
use App\Http\Resources\V1\DocumentsCollection;
use Illuminate\Http\Request;
use App\Filters\V1\DocumentFilter;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


class DocumentsController extends Controller
{


    public function index(Request $request)
    {
        $filter = new DocumentFilter();
        $filterItems = $filter->transform($request);  //[['column,', 'operator', 'value']]
        return new DocumentsCollection(Document::where($filterItems)->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDocumentsRequest $request)
    {
        return new DocumentsResource(Document::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Document $document)
    {
        return new DocumentsResource($document);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDocumentsRequest $request, Document $document)
    {
        $document->update($request->all());
        return new DocumentsResource($document);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $document)
    {
        // Capture the resource before deleting it
        $deletedDocument = new DocumentsResource($document);

        // Delete the document
        $document->delete();

        // Return the deleted resource
        return response()->json([
            'message' => 'Document deleted successfully',
            'data' => $deletedDocument
        ], 200);
    }





























    // public function index()
    // {
    //     return Inertia::render('DocumentsPage');
    // }

    public function upload(Request $request)
{
    $userId = $request->input('user_id');
    $files = $request->file('files'); // Retrieve the array of uploaded files
    $fileTypes = $request->input('file_types'); // Retrieve the array of file types

    $uploadedDocuments = []; // Array to store uploaded documents info

    if (!empty($files)) { // Check if any files were uploaded
        try {
            foreach ($files as $index => $file) {
                // Validate and process each uploaded file
                $request->validate([
                    'files.*' => 'required|file|mimes:pdf,doc,docx,xlsx,csv|max:10240',
                ]);

                $fileName = $file->getClientOriginalName();
                $filePath = $file->store('uploads'); // Store file in storage/app/uploads directory
                $fileType = $fileTypes[$index]; // Get the corresponding file type

                $document = Document::create([
                    'user_id' => $userId,
                    'title' => $fileName,
                    'path' => $filePath,
                    'type' => $fileType,
                ]);

                // Add the uploaded document's info to the array
                $uploadedDocuments[] = [
                    'id' => $document->id,
                    'title' => $document->title,
                    'path' => $document->path,
                    'type' => $document->type,
                ];
            }

            // Return uploaded documents in the response
            return response()->json([
                'message' => 'Files uploaded successfully',
                'data' => $uploadedDocuments
            ], 200);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to upload files: ' . $e->getMessage()], 500);
        }
    } else {
        return response()->json(['message' => 'No files uploaded'], 400);
    }
}

    public function fetchDoc(Request $request)
{
    // Get the authenticated user's ID STATIC FOR NOW
    $user_id = $request->input('user_id');



    // Fetch documents for the authenticated user
    $data = Document::where('user_id', '=', $user_id)->get(['id', 'title', 'path', 'type', 'visible']);

    if ($data->isEmpty()) {
        return response()->json([
            "status" => 0,
            "message" => "No documents found for the user.",
            "data" => [],
            "user_id" => $user_id
        ]);
    }

    // Add counter to the data
    $dataWithCounter = $data->map(function ($item, $index) {
        return [
            "doc_id" => $index + 1,
            "id" => $item->id,
            "title" => $item->title,
            "path" => $item->path,
            "visible" => $item->visible
        ];
    });

    return response()->json([
        "status" => 1,
        "message" => "Documents fetched successfully.",
        "data" => $dataWithCounter,
        "user_id" => $user_id  // Add user ID to the response for debugging
    ]);
}


public function download($id)
    {
        $file = Document::findOrFail($id);

        return Storage::download($file->path, $file->name);
    }



    public function deleteDoc(Request $request, $docId)
    {
        try {
            // Find the document by ID
            $document = Document::findOrFail($docId);

            // Store the document info before deleting
            $documentInfo = $document->only(['id', 'title', 'path', 'type']);

            // Delete the document file from storage
            Storage::delete($document->path);

            // Delete the document record from the database
            $document->delete();

            // Return the deleted document's information and success message
            return response()->json([
                'status' => 1,
                'message' => 'Document deleted successfully.',
                'data' => $documentInfo,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 0,
                'message' => 'Error deleting document: ' . $e->getMessage(),
            ], 500);
        }
    }



public function shareDocument(Request $request, $documentId)
{
    $document = Document::findOrFail($documentId);


    $userIds = $request->input('user_ids');


    $document->sharedWithUsers()->syncWithoutDetaching($userIds);

    return response()->json(['message' => 'Document shared successfully.']);
}

public function getAllUserDocuments($userId)
{
    // Fetch all documents for the given user
    $documents = Document::where('user_id', $userId)->get();

    // Check if any documents were found
    if ($documents->isEmpty()) {
        return response()->json([
            'status' => 0,
            'message' => 'No documents found for the user.',
            'data' => [],
            'user_id' => $userId,
        ], 404);
    }

    // Return the list of documents
    return response()->json([
        'status' => 1,
        'message' => 'Documents fetched successfully.',
        'data' => DocumentsResource::collection($documents),
        'user_id' => $userId,
    ], 200);
}




}
