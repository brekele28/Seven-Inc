<?php

namespace App\Http\Requests\Loker;

use Illuminate\Foundation\Http\FormRequest;

class UpdateKarirLokerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'hero_badge' => 'sometimes|required|string|max:100',
            'hero_title' => 'sometimes|required|string|max:255',
            'hero_description' => 'sometimes|required|string',
            'jobs_badge' => 'sometimes|required|string|max:100',
            'jobs_title' => 'sometimes|required|string|max:255',
        ];
    }
}