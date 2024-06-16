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
            'users' => $this->whenLoaded('users')
        ];
    }
}
