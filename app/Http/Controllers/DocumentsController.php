<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class DocumentsController extends Controller
{
    public function index()
    {
        return Inertia::render('DocumentsPage');
    }

    public function upload(Request $request)
    {
        $userId = $request->input('user_id');
        $files = $request->file('files'); // Retrieve the array of uploaded files
        $fileTypes = $request->input('file_types'); // Retrieve the array of file types

        Log::info('Upload request received', [
            'user_id' => $userId,
            'files_count' => is_array($files) ? count($files) : 0,
            'file_types' => $fileTypes
        ]);

        if (!empty($files)) { // Check if any files were uploaded
            try {
                foreach ($files as $index => $file) {
                    Log::info('Processing file', [
                        'index' => $index,
                        'file_name' => $file->getClientOriginalName(),
                        'file_size' => $file->getSize()
                    ]);

                    // Validate and process each uploaded file
                    $request->validate([
                        'files.*' => 'required|file|mimes:pdf,doc,docx|max:10240',
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

                    Log::info('File stored', [
                        'file_name' => $fileName,
                        'file_path' => $filePath,
                        'file_type' => $fileType
                    ]);
                }

                Log::info('All files processed successfully');

                return response()->json(['message' => 'Files uploaded successfully'], 200);
            } catch (\Exception $e) {
                Log::error('Failed to upload files', [
                    'error' => $e->getMessage()
                ]);

                return response()->json(['message' => 'Failed to upload files: ' . $e->getMessage()], 500);
            }
        } else {
            Log::warning('No files uploaded');

            return response()->json(['message' => 'No files uploaded'], 400);
        }
    }

    public function fetchDoc(Request $request)
{
    // Get the authenticated user's ID STATIC FOR NOW
    $user_id = $request->input('user_id');

    // Log the user ID for debugging purposes
    \Log::info('Fetching documents for user ID: ' . $user_id);

    // Fetch documents for the authenticated user
    $data = Document::where('user_id', '=', $user_id)->get(['id', 'title', 'path', 'type']);

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
            "path" => $item->path
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
            $document = Document::findOrFail($docId);
            Storage::delete($document->path);

            $document->delete();

            return response()->json([
                'status' => 1,
                'message' => 'Document deleted successfully.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 0,
                'message' => 'Error deleting document: ' . $e->getMessage(),
            ], 500);
        }
}
}
