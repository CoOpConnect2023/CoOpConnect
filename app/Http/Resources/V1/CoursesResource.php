<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CoursesResource extends JsonResource
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
            'name' => $this->name,
            'startDate' => $this->start_date,
            'endDate' => $this->end_date,
            'teacherID' => $this->teacher_id,
            'schoolID' => $this->school_id,
            'users' => $this->whenLoaded('users'),
        ];
    }
}
