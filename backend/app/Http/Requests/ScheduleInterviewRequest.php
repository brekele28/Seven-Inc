<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ScheduleInterviewRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'lokasi_interview' => trim((string) $this->lokasi_interview),
        ]);
    }

    public function rules(): array
    {
        return [
            'tanggal_interview' => ['required', 'date', 'after_or_equal:today'],
            'jam_interview' => ['required', 'date_format:H:i'],
            'lokasi_interview' => ['required', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'tanggal_interview.required' => 'Tanggal interview wajib diisi.',
            'tanggal_interview.after_or_equal' => 'Tanggal interview tidak boleh sebelum hari ini.',
            'jam_interview.required' => 'Jam interview wajib diisi.',
            'jam_interview.date_format' => 'Format jam interview harus HH:MM.',
            'lokasi_interview.required' => 'Lokasi interview wajib diisi.',
        ];
    }
}