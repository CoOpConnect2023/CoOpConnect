<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserJobsRequest extends FormRequest
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
        if ($this->method() === 'PUT') {
            return [
                'user_id' => ['required', 'exists:users_id'],
                'jobs_id' => ['required', 'exists:jobs_id'],
            ];
        } else {
            return [
                'user_id' => ['sometimes', 'required', 'exists:users_id'],
                'jobs_id' => ['sometimes', 'required', 'exists:jobs_id'],
            ];
        }
    }
    protected function prepareForValidation()
    {
        $this->merge([
            'user_id' => $this->userId,
            'jobs_id' => $this->jobsId
        ]);
    }
}
