<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTeacherEmployerRequest extends FormRequest
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
                'teacher_id' => ['required', 'exists:users,id'],
                'employer_id' => ['required', 'exists:users,id'],
            ];
        } else {
            return [
                'teacher_id' => ['sometimes', 'required', 'exists:users,id'],
                'employer_id' => ['sometimes', 'required', 'exists:users,id'],
            ];
        }
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation()
    {
        $this->merge(array_filter([
            'teacher_id' => $this->teacher_id,
            'employer_id' => $this->employer_id,
        ]));
    }
}
