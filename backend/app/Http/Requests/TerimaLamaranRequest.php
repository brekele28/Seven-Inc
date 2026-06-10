<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TerimaLamaranRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'pesan_tambahan' => trim((string) $this->pesan_tambahan),
        ]);
    }

    public function rules(): array
    {
        return [
            'tanggal_mulai_kerja' => ['nullable', 'date'],
            'pesan_tambahan' => ['nullable', 'string', 'max:1000'],
        ];
    }
}