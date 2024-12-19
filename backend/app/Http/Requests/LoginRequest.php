<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function wantsJson()
    {
        return true; // Forces JSON response for this request
    }

    public function rules()
    {
        return [
            'email' => 'required|email',
        ];
    }
}
