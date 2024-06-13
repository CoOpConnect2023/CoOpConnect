<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTokenRequest extends FormRequest
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
                'email' => ['required', 'email'],
                'token' => ['required']
            ];
        } else {
            return [
                'email' => ['sometimes', 'required', 'email'],
                'token' => ['sometimes', 'required']
            ];
        }
    }

    protected function prepareForValidation()
    {
        $this->merge([]);
    }
}
