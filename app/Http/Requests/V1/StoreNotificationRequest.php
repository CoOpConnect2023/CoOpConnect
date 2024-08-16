<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class StoreNotificationRequest extends FormRequest
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
        return [
            'from_user_id' => 'required|exists:users,id', // Must exist in the users table
            'to_user_id' => 'required|exists:users,id',   // Must exist in the users table
            'viewed' => 'required|boolean',               // Must be true or false
            'content' => 'required|string|max:255',       // Required, string, max length of 255 characters
            'type' => 'nullable|string|in:Interview Scheduled,Application Accepted,Application Rejected,Application Status,Other', // Optional, must be one of the predefined types
            'interview_date' => 'nullable|date',          // Optional, must be a valid date format
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'from_user_id.required' => 'The sender (from_user_id) is required.',
            'from_user_id.exists' => 'The sender must be a valid user.',
            'to_user_id.required' => 'The recipient (to_user_id) is required.',
            'to_user_id.exists' => 'The recipient must be a valid user.',
            'viewed.required' => 'The viewed field is required.',
            'viewed.boolean' => 'The viewed field must be true or false.',
            'content.required' => 'The content field is required.',
            'content.max' => 'The content may not be greater than 255 characters.',
            'type.in' => 'The type must be one of the following: Interview Scheduled, Application Accepted, or Application Rejected.',
            'interview_date.date' => 'The interview date must be a valid date.',
        ];
    }
}
