<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class DocumentsController extends Controller
{
    public function index()
    {
        return Inertia::render('DocumentsPage');
    }

    public function upload(Request $request)
    {
        $userId = $request->input('user_id');
        $request->validate([
            'document' => 'required|file|mimes:pdf,doc,docx|max:10240',
        ]);

        if ($request->hasFile('document')) {
            $file = $request->file('document');
            $fileName = $file->getClientOriginalName();
            $filePath = $file->storeAs('uploads', $fileName);

            $document = Document::create([
                'user_id' => $userId,
                'title' => $fileName,
                'path' => $filePath,
            ]);

            return response()->json(['message' => 'File uploaded successfully', 'id' => $document->id], 200);
        } else {
            return response()->json(['message' => 'No file uploaded'], 400);
        }
    }

    public function fetchDoc(Request $request)
    {
        $user_id = $request->input('user_id');
        $data = Document::where('user_id', '=', $user_id)->get(['id', 'title', 'path']);

        if($data->isEmpty()) {
            return response()->json([
                "status" => 0,
                "message" => "No documents found for the user.",
                "data" => []
            ]);
        }
    
        $counter = 0;
        $dataWithCounter = $data->map(function ($item) use (&$counter) {
            $counter++;
            return [
                "doc_id" => $counter,
                "id" => $item->id,
                "title" => $item->title,
                "path" => $item->path
            ];
        });
    
        return response()->json([
            "status" => 1,
            "message" => "Documents fetched successfully.",
            "data" => $dataWithCounter
        ]);
    
    }

    public function deleteDoc(Request $request, $docId)
    {
        Document::where('id', '=', $docId)->delete();
    }
}