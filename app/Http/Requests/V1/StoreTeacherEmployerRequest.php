<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTeacherEmployerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'teacher_id' => ['required', 'exists:users,id'],
            'employer_id' => ['nullable', 'exists:users,id'],

            'employer_name' => ['nullable', 'string'],
            'company_name' => ['nullable', 'string'],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge(array_filter([
            'teacher_id' => $this->teacher_id,
            'employer_id' => $this->employer_id,
            
            'employer_name' => $this->employer_name,
            'company_name' => $this->company_name,
        ]));
    }
}
