<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSchoolRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'sometimes|required|string|max:255',
            'location' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'principal_name' => 'nullable|string|max:255',
            'contact_email' => 'nullable|string|max:255',
            'contact_phone' => 'nullable|string|max:255',
        ];
    }
}
