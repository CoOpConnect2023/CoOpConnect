<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateJobsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
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
                'title' => ['required'],
                'description' => ['required'],
                'skills' => ['required'],
                'location' => ['required'],
                'postingStatus' => ['required', Rule::in(['open', 'closed'])],
                'jobType' => ['required', Rule::in(['full-time', 'part-time', 'contract', 'remote'])],
                'company' => ['required']
            ];
        } else {
            return [
                'title' => ['sometimes', 'required'],
                'description' => ['sometimes', 'required'],
                'skills' => ['sometimes', 'required'],
                'location' => ['sometimes', 'required'],
                'postingStatus' => ['sometimes', 'required', Rule::in(['open', 'closed'])],
                'jobType' => ['sometimes', 'required', Rule::in(['full-time', 'part-time', 'contract', 'remote'])],
                'company' => ['sometimes', 'required']
            ];
        }
    }

    protected function prepareForValidation()
    {
        $this->merge(array_filter([
            'posting_status' => $this->postingStatus,
            'job_type' => $this->jobType
        ]));
    }
}
