<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DokumenLamaran;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function previewCv(int $id)
    {
        $dokumen = DokumenLamaran::find($id);

        if (!$dokumen) {
            abort(404, 'Dokumen tidak ditemukan.');
        }

        $path = $dokumen->path_file;

        if (!$path || !Storage::disk('public')->exists($path)) {
            abort(404, 'File tidak ditemukan.');
        }

        $absolutePath = Storage::disk('public')->path($path);

        return response()->file(
            $absolutePath,
            [
                'Content-Type' => $dokumen->tipe_file ?: 'application/pdf',
                'Content-Disposition' => 'inline; filename="' . $dokumen->nama_file . '"',
                'Cache-Control' => 'public, max-age=86400',
            ]
        );
    }
}