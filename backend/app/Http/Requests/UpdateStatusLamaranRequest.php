<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStatusLamaranRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'status_slug' => [
                'required',
                'string',
                'exists:status_lamaran,slug',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'status_slug.required' => 'Status lamaran wajib dipilih.',
            'status_slug.exists' => 'Status lamaran tidak valid.',
        ];
    }
}