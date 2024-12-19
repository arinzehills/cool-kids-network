<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class RoleUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|email|exists:users,email',
            'role' => 'required|in:' . implode(',', [
                User::ROLE_COOL_KID,
                User::ROLE_COOLER_KID,
                User::ROLE_COOLEST_KID,
                User::ROLE_MAINTAINER,
            ])
        ];
    }
}
