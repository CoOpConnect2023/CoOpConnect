<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class InterviewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Interviews::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    try {
        // Directly insert incoming request data without validation
        $interview = new Interviews();
        $interview->title = $request->input('title');
        $interview->description = $request->input('description');
        $interview->start = $request->input('start');
        $interview->end = $request->input('end');
        $interview->status = $request->input('status');
        $interview->save();

        // Log successful creation
        \Log::info('Interview created:', ['id' => $interview->id]);

        // Return the created interview if needed
        return response()->json($interview, 201);
    } catch (\Exception $e) {
        // Log any exceptions or errors
        \Log::error('Error creating interview:', ['message' => $e->getMessage(), 'trace' => $e->getTrace()]);
        return response()->json(['error' => 'Error creating interview. See logs for details.'], 500);
    }
}



    /**
     * Display the specified resource.
     */
    public function show(Interviews $interview)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Interviews $interview)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Interviews $interview)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Interviews $interview)
    {
        //
    }
}
