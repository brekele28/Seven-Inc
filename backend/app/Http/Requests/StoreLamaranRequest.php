<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLamaranRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'email' => strtolower(trim((string) $this->email)),
            'no_whatsapp' => preg_replace('/[^\d+]/', '', (string) $this->no_whatsapp),
        ]);
    }

    public function rules(): array
    {
        return [
            'lowongan_id' => ['required', 'integer', 'exists:lowongan,id'],

            'nama_lengkap' => ['required', 'string', 'max:150'],
            'email' => ['required', 'email', 'max:150'],
            'no_whatsapp' => ['required', 'string', 'min:8', 'max:30'],
            'jenis_kelamin' => ['required', 'in:laki-laki,perempuan'],
            'tempat_lahir' => ['required', 'string', 'max:150'],
            'tanggal_lahir' => ['required', 'date'],
            'alamat' => ['required', 'string'],

            'cv_pdf' => ['required', 'file', 'mimes:pdf', 'max:5120'],
        ];
    }

    public function messages(): array
    {
        return [
            'lowongan_id.required' => 'Lowongan wajib dipilih.',
            'lowongan_id.exists' => 'Lowongan tidak ditemukan.',

            'nama_lengkap.required' => 'Nama lengkap wajib diisi.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'no_whatsapp.required' => 'Nomor WhatsApp wajib diisi.',
            'jenis_kelamin.required' => 'Jenis kelamin wajib dipilih.',
            'tempat_lahir.required' => 'Tempat lahir wajib diisi.',
            'tanggal_lahir.required' => 'Tanggal lahir wajib diisi.',
            'alamat.required' => 'Alamat wajib diisi.',

            'cv_pdf.required' => 'CV wajib diupload.',
            'cv_pdf.mimes' => 'CV harus berformat PDF.',
            'cv_pdf.max' => 'Ukuran CV maksimal 5MB.',
        ];
    }
}