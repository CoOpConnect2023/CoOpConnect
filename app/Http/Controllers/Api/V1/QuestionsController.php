<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Question;
use App\Models\Answer;
use App\Models\Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class QuestionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Retrieve questions with their answers and responses
        $questions = Question::with(['answers', 'responses'])->get();

        return response()->json($questions);
    }


    /**
     * Store a newly created question along with at least one answer.
     */
    public function store(Request $request)
{
    // Validation
    $validatedData = $request->validate([
        'jobs_id' => 'required|exists:jobs,id', // Make sure the job exists
        'question_text' => 'required|string|max:255',
        'question_type' => 'required|in:text,multipleChoice',
        'answers' => 'required|array|min:1', // At least one answer is required
        'answers.*.answer_text' => 'required|string|max:255', // Validate each answer
        'answers.*.is_correct' => 'boolean', // Optional field to indicate correct answer
    ]);

    DB::beginTransaction();

    try {
        // Create the question and link it to a job
        $question = Question::create([
            'jobs_id' => $validatedData['jobs_id'], // Link the question to the job
            'question_text' => $validatedData['question_text'],
            'question_type' => $validatedData['question_type'],
        ]);

        // Insert answers
        foreach ($validatedData['answers'] as $answerData) {
            Answer::create([
                'question_id' => $question->id,
                'answer_text' => $answerData['answer_text'],
                'is_correct' => $answerData['is_correct'] ?? false, // Default to false if not provided
            ]);
        }

        DB::commit();

        return response()->json([
            'message' => 'Question and answers created successfully',
            'question' => $question->load('answers')
        ], 201);

    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['error' => 'Failed to create question and answers: ' . $e->getMessage()], 500);
    }
}



    /**
     * Display the specified question along with its answers.
     */
    public function show($id)
    {
        $question = Question::with(['answers', 'responses'])->find($id);

        if (!$question) {
            return response()->json(['error' => 'Question not found'], 404);
        }

        return response()->json($question);
    }

    /**
     * Update the specified question along with its answers.
     */
    public function update(Request $request, $id)
    {
        $question = Question::find($id);

        if (!$question) {
            return response()->json(['error' => 'Question not found'], 404);
        }

        $validatedData = $request->validate([
            'question_text' => 'required|string|max:255',
            'question_type' => 'required|in:text,multipleChoice',
            'answers' => 'required|array|min:1',
            'answers.*.answer_text' => 'required|string|max:255',
            'answers.*.is_correct' => 'boolean',
        ]);

        DB::beginTransaction();

        try {
            // Update question
            $question->update([
                'question_text' => $validatedData['question_text'],
                'question_type' => $validatedData['question_type'],
            ]);

            // Delete existing answers and create new ones
            Answer::where('question_id', $question->id)->delete();
            foreach ($validatedData['answers'] as $answerData) {
                Answer::create([
                    'question_id' => $question->id,
                    'answer_text' => $answerData['answer_text'],
                    'is_correct' => $answerData['is_correct'] ?? false,
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Question and answers updated successfully',
                'question' => $question->load('answers')
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to update question and answers'], 500);
        }
    }

    /**
     * Remove the specified question from storage.
     */
    public function destroy($id)
    {
        $question = Question::find($id);

        if (!$question) {
            return response()->json(['error' => 'Question not found'], 404);
        }

        // Delete the question and related answers
        $question->delete();

        return response()->json(['message' => 'Question and answers deleted successfully'], 200);
    }


    public function storeResponse(Request $request, $questionId)
{
    // Find the question
    $question = Question::find($questionId);

    if (!$question) {
        return response()->json(['error' => 'Question not found'], 404);
    }

    // Validate the request based on the type of the question
    if ($question->question_type === 'text') {
        // Validation for text-based questions
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'response_text' => 'required|string|max:1000', // Adjust the max length as needed
        ]);

        // Store the response for text questions
        $response = $question->responses()->create([
            'user_id' => $validatedData['user_id'],
            'response_text' => $validatedData['response_text'],
        ]);
    } else if ($question->question_type === 'multipleChoice') {
        // Validation for multiple-choice questions
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'answer_id' => 'required|exists:answers,id', // Validate the selected answer ID
        ]);

        // Store the response for multiple-choice questions
        $response = $question->responses()->create([
            'user_id' => $validatedData['user_id'],
            'answer_id' => $validatedData['answer_id'],
        ]);
    } else {
        return response()->json(['error' => 'Invalid question type'], 400);
    }

    return response()->json([
        'message' => 'Response submitted successfully',
        'response' => $response
    ], 201);
}


public function storeResponses(Request $request)
{
    // Validate the incoming data for multiple responses
    $validatedData = $request->validate([
        'user_id' => 'required|exists:users,id',
        'responses' => 'required|array',
        'responses.*.question_id' => 'required|exists:questions,id',
        'responses.*.response_text' => 'nullable|string|max:1000', // For text-based responses
        'responses.*.answer_id' => 'nullable|exists:answers,id',    // For multiple-choice answers
    ]);

    $userId = $validatedData['user_id'];
    $responses = $validatedData['responses'];

    $storedResponses = [];

    // Loop through each response
    foreach ($responses as $response) {
        // Find the question
        $question = Question::find($response['question_id']);

        if (!$question) {
            return response()->json(['error' => 'Question not found'], 404);
        }

        // Store based on the question type
        if ($question->question_type === 'text') {
            $storedResponse = $question->responses()->create([
                'user_id' => $userId,
                'response_text' => $response['response_text'],
            ]);
        } else if ($question->question_type === 'multipleChoice') {
            $storedResponse = $question->responses()->create([
                'user_id' => $userId,
                'answer_id' => $response['answer_id'],
            ]);
        } else {
            return response()->json(['error' => 'Invalid question type'], 400);
        }

        // Collect the stored response for the final response
        $storedResponses[] = $storedResponse;
    }

    return response()->json([
        'message' => 'Responses submitted successfully',
        'responses' => $storedResponses
    ], 201);
}


public function getQuestionsByJob($jobId)
{
    // Load questions with their answers and responses, including user details
    $questions = Question::where('jobs_id', $jobId)
        ->with([
            'answers.responses.user',  // Eager load answers, responses, and users for multiple-choice questions
            'responses.user'           // Eager load direct responses and users for text-based questions
        ])
        ->get();

    // Check if questions were found
    if ($questions->isEmpty()) {
        return response()->json(['message' => 'No questions found for this job.'], 404);
    }

    return response()->json($questions, 200);
}






}
