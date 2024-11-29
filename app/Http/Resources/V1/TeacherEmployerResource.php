<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeacherEmployerResource extends JsonResource
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
        "teacherId" => $this->pivot->teacher_id ?? null,
        "employerId" => $this->pivot->employer_id ?? null,
        "teacherName" => $this->relationLoaded('teachers') ? optional($this->teachers->first())->name : null,
        "employerName" => $this->name ?? null,
        "employerEmail" => $this->email ?? null,
        

        // Load company information
        "companyId" => $this->company_id ?? null,
        "companyName" => $this->company->name,  // Get company name from relationship

        "createdAt" => $this->created_at,
        "updatedAt" => $this->updated_at,
    ];
}
}
