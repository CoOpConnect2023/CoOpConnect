<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Jobs;
use App\Http\Requests\V1\StoreJobsRequest;
use App\Http\Requests\V1\UpdateJobsRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\JobsResource;
use App\Http\Resources\V1\JobsCollection;
use Illuminate\Http\Request;
use App\Filters\V1\JobsFilter;
use App\Models\Question;
use App\Models\Answer;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;


class JobsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new JobsFilter();
        $filterItems = $filter->transform($request);


        $includeUsers = $request->query('includeUsers');

        $jobs = Jobs::where($filterItems);

        if ($includeUsers) {
            $jobs = $jobs->with('users');
        }

        return new JobsCollection($jobs->get());
    }

    public function getJobsforUser($userId)
    {
        // Fetch all jobs related to the specific user
        $userJobs = Jobs::whereHas('users', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->get();

        // Return the jobs as a JSON response
        return new JobsCollection($userJobs);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJobsRequest $request)
    {
        return new JobsResource(Jobs::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Jobs $job)
{
    // Load applications with users, including their emails
    // Also load related questions with the associated job
    $job->load([
        'applications.user' => function ($query) {
            $query->select('id', 'name', 'email'); // Select necessary fields
        },
        'questions' => function ($query) {
            $query->select('id', 'question_text', 'jobs_id', 'question_type'); // Select necessary fields for questions
        }
    ]);

    return new JobsResource($job);
}
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJobsRequest $request, Jobs $job)
{
    // Retrieve request data
    $data = $request->all();

    // Map camelCase fields to snake_case based on the columnMap
    $columnMap = [
        'postingStatus' => 'posting_status',
        'jobType' => 'job_type',
        'userId' => 'user_id',
        'startDate' => 'start_date',
        'endDate' => 'end_date',
    ];

    foreach ($columnMap as $camelCase => $snakeCase) {
        // If the camelCase field exists in the request, map it to the snake_case version
        if (isset($data[$camelCase])) {
            $data[$snakeCase] = $data[$camelCase];
            unset($data[$camelCase]); // Remove the camelCase version
        }
    }

    // Update the job with the transformed data
    $job->update($data);

    return new JobsResource($job);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jobs $job)
    {
        $job->delete();
    }

    public function matchSkills(Request $request)
    {

        // Get skills from request or default to the authenticated user's skills
        $userSkills = $request->input('skills');


        // Parse the skills into an array, handle cases where it's null or empty
        $userSkillsArray = $userSkills ?: auth()->user()->skills ?: [];

        $userSkillsArray = array_map('strtolower', $userSkillsArray);


        // Retrieve jobs that match the provided or user's skills
        $matchingJobs = Jobs::where(function ($query) use ($userSkillsArray) {
            foreach ($userSkillsArray as $skill) {
                $query->orWhereRaw("LOWER(skills) LIKE ?", ['%"' . strtolower($skill) . '"%']);
            }
        })->get();


        if ($matchingJobs->isEmpty()) {
            return response()->json(['message' => 'No jobs match the provided skills.'], 404);
        }

        // Return the matching jobs as JSON
        return new JobsCollection($matchingJobs);
    }

    public function searchJobs(Request $request)
    {




        $searchTerms = $request->input('searchTerm');
        $location = $request->input('location');





        $query = Jobs::query();

        if ($searchTerms) {
            $query->where(function ($q) use ($searchTerms) {
                foreach ($searchTerms as $searchTerm) {
                    $searchTerm = strtolower($searchTerm);
                    $q->orWhere(function ($q) use ($searchTerm) {
                        $q->whereRaw('LOWER(title) LIKE ?', ["%{$searchTerm}%"])
                            ->orWhere(function ($q) use ($searchTerm) {
                                $q->whereRaw('JSON_SEARCH(LOWER(skills), "one", LOWER(?)) IS NOT NULL', [$searchTerm]);
                            });
                    });
                }
            });
        }

        // Check if $location is not empty before adding it to the query
        if (!empty($location)) {
            $location = strtolower($location);
            $query->whereRaw('LOWER(location) LIKE ?', ["%{$location}%"]);
        }

        $matchingJobs = $query->get();

        return new JobsCollection($matchingJobs);
    }




    public function storeJobWithQuestions(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'postingStatus' => 'required|string|max:255',
            'jobType' => 'required|string|max:255',
            'company_id' => 'required|exists:companies,id',
            'startDate' => 'nullable|date',
            'endDate' => 'nullable|date|after_or_equal:startDate', // Ensuring endDate is after or equal to startDate

            // Skills validation (as an array)
            'skills' => 'nullable|array',
            'skills.*' => 'nullable|string|max:255', // Each skill must be a string

            // Questions validation (fully optional)
            'questions' => 'nullable|array',
            'questions.*.question_text' => 'nullable|string|max:255', // Optional question text
            'questions.*.question_type' => 'nullable|in:text,multipleChoice', // Optional question type

            // Answers validation for multipleChoice questions (fully optional)
            'questions.*.answers' => 'nullable|array', // Answers are optional
            'questions.*.answers.*.answer_text' => 'nullable|string|max:255', // Optional answer text
            'questions.*.answers.*.is_correct' => 'boolean', // Boolean field for marking correct answer, optional
        ]);

        DB::beginTransaction();

        try {

            $userId = Auth::id();
            // Step 1: Create Job
            $job = Jobs::create([
                'title' => $validatedData['title'],
                'user_id' => $userId,
                'description' => $validatedData['description'],
                'location' => $validatedData['location'],
                'posting_status' => $validatedData['postingStatus'],
                'job_type' => $validatedData['jobType'],
                'company_id' => $validatedData['company_id'],
                'start_date' => $validatedData['startDate'] ?? null, // Store start date if provided
                'end_date' => $validatedData['endDate'] ?? null,     // Store end date if provided
                'skills' => $validatedData['skills'] ?? [], // Store skills array, or an empty array if not provided
            ]);

            // Step 2: Create Questions and Answers
            foreach ($validatedData['questions'] as $questionData) {
                $question = Question::create([
                    'jobs_id' => $job->id,
                    'question_text' => $questionData['question_text'],
                    'question_type' => $questionData['question_type'],
                ]);

                if ($questionData['question_type'] === 'multipleChoice') {
                    foreach ($questionData['answers'] as $answerData) {
                        Answer::create([
                            'question_id' => $question->id,
                            'answer_text' => $answerData['answer_text'],
                            'is_correct' => $answerData['is_correct'] ?? false,
                        ]);
                    }
                }
            }

            DB::commit();

            return response()->json([
                'message' => 'Job, questions, answers, and skills created successfully',
                'job' => $job->load('questions.answers') // Include questions and answers in the response
            ], 201);

        } catch (ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $e->errors(), // This will return the specific validation errors
            ], 422);
        }
    }



public function updateJobWithQuestions(Request $request, $jobId)
{
    // Validate the incoming data, including skills array
    $validatedData = $request->validate([
        'title' => 'sometimes|string|max:255',
        'description' => 'sometimes|string',
        'location' => 'sometimes|string|max:255',
        'postingStatus' => 'sometimes|string|max:255',
        'jobType' => 'sometimes|string|max:255',
        'company_id' => 'sometimes|exists:companies,id',
        'startDate' => 'nullable|date',
        'endDate' => 'nullable|date|after_or_equal:startDate', // Ensuring endDate is after or equal to startDate

        // Skills validation (array of strings)
        'skills' => 'nullable|array',
        'skills.*' => 'nullable|string|max:255', // Validate each skill is a string and has a max length of 255 characters

        // Questions validation (fully optional)
        'questions' => 'nullable|array',
        'questions.*.id' => 'nullable|exists:questions,id', // Check if the question already exists
        'questions.*.question_text' => 'nullable|string|max:255',
        'questions.*.question_type' => 'nullable|in:text,multipleChoice',

        // Answers validation for multipleChoice questions (fully optional)
        'questions.*.answers' => 'nullable|array',
        'questions.*.answers.*.id' => 'nullable|exists:answers,id', // Check if the answer already exists
        'questions.*.answers.*.answer_text' => 'nullable|string|max:255',
        'questions.*.answers.*.is_correct' => 'boolean',
    ]);

    DB::beginTransaction();

    try {
        // Find the job and update the existing fields
        $job = Jobs::findOrFail($jobId);

        $job->update([
            'title' => $validatedData['title'] ?? $job->title,
            'description' => $validatedData['description'] ?? $job->description,
            'location' => $validatedData['location'] ?? $job->location,
            'posting_status' => $validatedData['postingStatus'] ?? $job->posting_status,
            'job_type' => $validatedData['jobType'] ?? $job->job_type,
            'company_id' => $validatedData['company_id'] ?? $job->company_id,
            'start_date' => $validatedData['startDate'] ?? $job->start_date,
            'end_date' => $validatedData['endDate'] ?? $job->end_date,
            'skills' => $validatedData['skills'] ?? $job->skills, // Handle skills as a JSON array
        ]);

        // Step 1: Identify questions to delete
        $existingQuestions = $job->questions->pluck('id')->toArray(); // Get current question IDs from DB
        $updatedQuestionIds = collect($validatedData['questions'])->pluck('id')->filter()->toArray(); // Get IDs from incoming request

        // Find questions that are in the DB but not in the update
        $questionsToDelete = array_diff($existingQuestions, $updatedQuestionIds);
        if (!empty($questionsToDelete)) {
            // Delete the questions and their associated answers
            Question::whereIn('id', $questionsToDelete)->delete();
            Answer::whereIn('question_id', $questionsToDelete)->delete();
        }

        // Step 2: Update or create questions and answers
        foreach ($validatedData['questions'] as $questionData) {
            // Check if the question exists, update it or create a new one
            $question = isset($questionData['id'])
                ? Question::findOrFail($questionData['id'])
                : new Question(['jobs_id' => $job->id]);

            $question->fill([
                'question_text' => $questionData['question_text'] ?? $question->question_text,
                'question_type' => $questionData['question_type'] ?? $question->question_type,
            ])->save();

            // If the question is multipleChoice, update or create answers
            if ($questionData['question_type'] === 'multipleChoice') {
                foreach ($questionData['answers'] as $answerData) {
                    // Check if the answer exists, update it or create a new one
                    $answer = isset($answerData['id'])
                        ? Answer::findOrFail($answerData['id'])
                        : new Answer(['question_id' => $question->id]);

                    $answer->fill([
                        'answer_text' => $answerData['answer_text'] ?? $answer->answer_text,
                        'is_correct' => $answerData['is_correct'] ?? $answer->is_correct,
                    ])->save();
                }
            }
        }

        DB::commit();

        return response()->json([
            'message' => 'Job, skills, questions, and answers updated successfully',
            'job' => $job->load('questions.answers')
        ], 200);

    } catch (ValidationException $e) {
        DB::rollBack();
        return response()->json([
            'message' => 'Validation Failed',
            'errors' => $e->errors(),
        ], 422);
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json([
            'message' => 'An error occurred while updating the job',
            'error' => $e->getMessage(),
        ], 500);
    }
}












}
