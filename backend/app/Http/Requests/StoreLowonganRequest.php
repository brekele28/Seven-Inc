<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreLowonganRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:150'],
            'intro' => ['required', 'string'],
            'openedAt' => ['required', 'date'],
            'closedAt' => ['required', 'date', 'after_or_equal:openedAt'],
            'status' => ['required', Rule::in(['draft', 'active'])],

            'sections' => ['required', 'array', 'min:1'],
            'sections.*.id' => ['nullable', 'string', 'max:100'],
            'sections.*.title' => ['required', 'string', 'max:150'],
            'sections.*.items' => ['required', 'array', 'min:1'],
            'sections.*.items.*' => ['required', 'string', 'max:1000'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Nama posisi wajib diisi.',
            'intro.required' => 'Deskripsi singkat lowongan wajib diisi.',
            'openedAt.required' => 'Tanggal buka wajib diisi.',
            'closedAt.required' => 'Tanggal tutup wajib diisi.',
            'closedAt.after_or_equal' => 'Tanggal tutup tidak boleh sebelum tanggal buka.',
            'status.required' => 'Status lowongan wajib dipilih.',
            'status.in' => 'Status lowongan tidak valid.',
            'sections.required' => 'Detail kualifikasi wajib diisi.',
            'sections.min' => 'Minimal harus ada satu section kualifikasi.',
            'sections.*.title.required' => 'Judul section wajib diisi.',
            'sections.*.items.required' => 'Poin kualifikasi wajib diisi.',
            'sections.*.items.min' => 'Minimal ada satu poin pada setiap section.',
        ];
    }
}