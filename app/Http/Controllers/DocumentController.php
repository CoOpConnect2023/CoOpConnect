<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        return $user->documents;
    }

    public function store(Request $request)
    {
        $request->validate([
            'document' => 'required|file|max:10240', // 10MB Max
        ]);

        $user = Auth::user();
        $file = $request->file('document');
        $path = $file->store('documents', 'public'); // Stores in 'storage/app/public/documents'

        $document = new Document([
            'title' => $file->getClientOriginalName(),
            'path' => $path,
            'user_id' => $user->id,
        ]);
        $document->save();

        return response()->json($document, 201);
    }
}
