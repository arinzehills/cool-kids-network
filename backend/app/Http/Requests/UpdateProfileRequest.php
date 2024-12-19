<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    public function authorize()
    {
        // Allow all authenticated users to perform this action
        return auth()->check();
    }

    public function rules()
    {
        return [
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'country' => 'sometimes|string|max:255',
            'phone' => 'sometimes|string|max:15',
        ];
    }
}
