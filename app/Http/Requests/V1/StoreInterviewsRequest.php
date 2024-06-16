<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreInterviewsRequest extends FormRequest
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
        return [
            'interview_date' => ['required', 'date'],
            'duration' => ['required', 'integer'],
            'status' => ['required', Rule::in(['scheduled', 'completed', 'canceled'])],
            'description' => ['required'],
            'interviewee_id' => ['required', 'exists:users_id'],
            'interviewer_id' => ['required', 'exists:users_id'],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'interview_date' => $this->interviewDate,
            'interviewee_id' => $this->intervieweeId,
            'interviewer_id' => $this->interviewerId,
        ]);
    }
}
