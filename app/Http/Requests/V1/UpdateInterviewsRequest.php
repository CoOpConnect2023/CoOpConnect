<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInterviewsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Adjust based on your authorization logic
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        if ($this->method() === "PUT") {
            return [
                'interview_date' => ['required', 'date'],
                'duration' => ['required', 'integer'],
                'status' => ['required', 'in:scheduled,completed,canceled'],
                'description' => ['required'],
                'interviewee_id' => ['required', 'exists:users,id'],
                'interviewer_id' => ['required', 'exists:users,id'],
            ];
        } else {
            return [
                'interview_date' => ['sometimes', 'required', 'date'],
                'duration' => ['sometimes', 'required', 'integer'],
                'status' => ['sometimes', 'required', 'in:scheduled,completed,canceled'],
                'description' => ['sometimes', 'required'],
                'interviewee_id' => ['sometimes', 'required', 'exists:users,id'],
                'interviewer_id' => ['sometimes', 'required', 'exists:users,id'],
            ];
        }
    }
    protected function prepareForValidation()
    {
        $this->merge(array_filter([
            'interview_date' => $this->interviewDate,
            'interviewee_id' => $this->intervieweeId,
            'interviewer_id' => $this->interviewerId,
        ]));
    }
}
