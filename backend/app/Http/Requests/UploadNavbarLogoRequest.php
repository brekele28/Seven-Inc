<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadNavbarLogoRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Route admin sudah dilindungi middleware admin.auth,
        // jadi di sini boleh true.
        return true;
    }

    public function rules(): array
    {
        return [
            /**
             * Kita batasi aman: png/jpg/jpeg/webp, max 2MB.
             * (SVG sengaja tidak diizinkan karena raw SVG bisa berisiko kalau tidak disanitasi.)
             */
            'logo' => [
                'required',
                'file',
                'mimes:png,jpg,jpeg,webp',
                'max:2048', // KB
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'logo.required' => 'File logo wajib diupload.',
            'logo.mimes' => 'Format logo harus png/jpg/jpeg/webp.',
            'logo.max' => 'Ukuran logo maksimal 2MB.',
        ];
    }
}