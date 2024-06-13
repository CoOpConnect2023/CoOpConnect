<?php

namespace App\Http\Controllers;

use App\Models\Reflection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ReflectionController extends Controller
{
    public function index()
    {
        $reflections = Reflection::where('user_id', auth()->id())->get();
        return response()->json(['reflections' => $reflections], 200);
    }

    public function store(Request $request)
{
    $request->validate([
        'content' => 'required|string',
    ]);

    $reflection = new Reflection();
    $reflection->user_id = auth()->id();
    $reflection->content = $request->input('content');

    // Handle image upload if present
    if ($request->hasFile('image')) {
        $request->validate([
            'image' => 'image|max:2048', // Adjust the max size as needed
        ]);

        $imagePath = $request->file('image')->store('public/images');
        $reflection->image = $imagePath;
    }

    $reflection->save();

    return response()->json(['message' => 'Reflection created successfully'], 201);
}
    public function update(Request $request, $id)
    {
        $reflection = Reflection::findOrFail($id);

        $request->validate([
            'image' => 'sometimes|nullable|image|max:2048',
            'content' => 'required|string',
        ]);

        if ($request->hasFile('image')) {
            Storage::delete($reflection->image);
            $imagePath = $request->file('image')->store('public/images');
            $reflection->image = $imagePath;
        }

        $reflection->content = $request->input('content');
        $reflection->save();

        return response()->json(['message' => 'Reflection updated successfully'], 200);
    }

    public function destroy($id)
    {
        $reflection = Reflection::findOrFail($id);
        Storage::delete($reflection->image);
        $reflection->delete();

        return response()->json(['message' => 'Reflection deleted successfully'], 200);
    }
}
