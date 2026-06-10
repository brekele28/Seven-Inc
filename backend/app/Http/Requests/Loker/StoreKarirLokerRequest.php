<?php

namespace App\Http\Requests\Loker;

use Illuminate\Foundation\Http\FormRequest;

class StoreKarirLokerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'hero_badge' => 'required|string|max:100',
            'hero_title' => 'required|string|max:255',
            'hero_description' => 'required|string',
            'jobs_badge' => 'required|string|max:100',
            'jobs_title' => 'required|string|max:255',
        ];
    }
}