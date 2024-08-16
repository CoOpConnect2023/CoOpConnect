<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class UpdateNotificationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Set to true to allow the update request
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'from_user_id' => 'sometimes|exists:users,id',  // Optional, must exist in the users table
            'to_user_id' => 'sometimes|exists:users,id',    // Optional, must exist in the users table
            'viewed' => 'sometimes|boolean',                // Optional, must be true or false
            'content' => 'sometimes|string|max:255',        // Optional, string, max length of 255 characters
            'type' => 'nullable|string|in:Interview Scheduled,Application Accepted,Application Rejected,Application Status,Other', // Optional, must be one of the predefined types
            'interview_date' => 'nullable|date',            // Optional, must be a valid date format
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
            'from_user_id.exists' => 'The sender must be a valid user.',
            'to_user_id.exists' => 'The recipient must be a valid user.',
            'viewed.boolean' => 'The viewed field must be true or false.',
            'content.max' => 'The content may not be greater than 255 characters.',
            'type.in' => 'The type must be one of the following: Interview Scheduled, Application Accepted, or Application Rejected.',
            'interview_date.date' => 'The interview date must be a valid date.',
        ];
    }
}
