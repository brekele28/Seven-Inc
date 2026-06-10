<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TolakLamaranRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'alasan' => trim((string) $this->alasan),
        ]);
    }

    public function rules(): array
    {
        return [
            'alasan' => ['nullable', 'string', 'max:1000'],
        ];
    }
}