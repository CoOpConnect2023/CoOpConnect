<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InterviewsResource extends JsonResource
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
            'interviewDate' => $this->interview_date,
            'duration' => $this->duration,
            'status' => $this->status,
            'description' => $this->description,
            'intervieweeId' => $this->interviewee_id,
            'interviewerId' => $this->interviewer_id,
        ];
    }
}
