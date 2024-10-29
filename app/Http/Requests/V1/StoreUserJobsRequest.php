<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserJobsRequest extends FormRequest
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
            'user_id' => ['required', 'exists:users,id'],
            'jobs_id' => ['required', 'exists:jobs,id'],
            'document_id' => ['nullable', 'exists:documents,id'],
            'resume' => ['nullable'],
            'status' => ['required'],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],

        ];
    }
    protected function prepareForValidation()
    {
        $this->merge(array_filter([
            'user_id' => $this->userId,
            'jobs_id' => $this->jobsId
        ]));
    }
}
