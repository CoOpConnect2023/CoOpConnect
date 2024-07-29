<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCoursesRequest extends FormRequest
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
                'name' => ['required'],
                'start_date' => ['required', 'date'],
                'end_date' => ['required', 'date', 'after_or_equal:start_date'],
                'teacher_id' => ['required', 'exists:users,id'],
                'school_id' => ['required']
            ];
        } else {
            return [
                'name' => ['sometimes', 'required'],
                'start_date' => ['sometimes', 'required', 'date'],
                'end_date' => ['sometimes', 'required', 'date', 'after_or_equal:start_date'],
                'teacher_id' => ['required', 'exists:users,id'],
                'school_id' => ['required']
            ];
        }
    }
    protected function prepareForValidation()
    {
        $this->merge(array_filter([
            'start_date' => $this->startDate,
            'end_date' => $this->endDate,
        ]));
    }
}
