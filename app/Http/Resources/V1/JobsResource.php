<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'skills' => $this->skills,
            'location' => $this->location,
            'postingStatus' => $this->posting_status,
            'jobType' => $this->job_type,
            'company' => $this->company,
            'userId' => $this->user_id,
            'startDate' => $this->start_date,
            'endDate' => $this->end_date,
            'users' => $this->whenLoaded('users'),
            'applications' => ApplicationResource::collection($this->whenLoaded('applications')),

            // Include questions and their answers
            'questions' => $this->whenLoaded('questions', function () {
                return $this->questions->map(function ($question) {
                    return [
                        'id' => $question->id,
                        'question_text' => $question->question_text,
                        'jobs_id' => $question->jobs_id,
                        'question_type' => $question->question_type,

                        // Include answers for the question
                        'answers' => $question->answers->map(function ($answer) {
                            return [
                                'id' => $answer->id,
                                'answer_text' => $answer->answer_text,
                                'is_correct' => $answer->is_correct,
                            ];
                        })
                    ];
                });
            }),
        ];
    }
}

