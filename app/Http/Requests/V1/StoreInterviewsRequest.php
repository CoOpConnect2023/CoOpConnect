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
            'title' => ['required'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date'],
            'status' => ['required', Rule::in(['scheduled', 'completed', 'canceled'])],
            'description' => ['required'],
            'interviewee_id' => ['required', 'exists:users,id'],
            'interviewer_id' => ['required', 'exists:users,id'],
            'proposed_time' => ['nullable', 'date'],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge(array_filter([
            'start_date' => $this->startDate,
            'end_date' => $this->endDate,
            'interviewee_id' => $this->intervieweeId,
            'interviewer_id' => $this->interviewerId,
            'proposed_time' => $this->proposedTime,
            
        ]));
    }
}
