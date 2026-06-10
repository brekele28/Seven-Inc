<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UploadNavbarLogoRequest;
use App\Models\NavbarLogo;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class NavbarLogoController extends Controller
{
    /**
     * Key tunggal untuk record logo.
     */
    private const LOGO_KEY = 'logo';

    /**
     * Default fallback logo (statis).
     * Pastikan file ini ada di: public/assets/logo-default.png
     */
    private function defaultLogoUrl(): string
    {
        return url('/assets/logo-default.png');
    }

    private function audit(string $event, array $context = []): void
    {
        Log::info('[SECURITY_AUDIT]', array_merge([
            'event' => $event,
            'ip' => request()->ip(),
            'ua' => substr((string) request()->userAgent(), 0, 255),
        ], $context));
    }

    /**
     * PUBLIC: Ambil logo navbar yang "final" (DB kalau ada, kalau tidak ada pakai default statis)
     */
    public function publicShow()
    {
        $record = NavbarLogo::where('key', self::LOGO_KEY)->first();

        if ($record && $record->path && Storage::disk('public')->exists($record->path)) {
            return response()->json([
                'source' => 'db',
                'logo' => [
                    'url' => Storage::url($record->path),
                ],
            ]);
        }

        return response()->json([
            'source' => 'default',
            'logo' => [
                'url' => $this->defaultLogoUrl(),
            ],
        ]);
    }

    /**
     * ADMIN: Lihat logo yang sedang dipakai (untuk dashboard admin)
     */
    public function adminShow()
    {
        $record = NavbarLogo::where('key', self::LOGO_KEY)->first();

        if ($record && $record->path && Storage::disk('public')->exists($record->path)) {
            return response()->json([
                'has_custom_logo' => true,
                'logo' => [
                    'url' => Storage::url($record->path),
                    'updated_at' => $record->updated_at,
                ],
            ]);
        }

        return response()->json([
            'has_custom_logo' => false,
            'logo' => [
                'url' => $this->defaultLogoUrl(),
            ],
        ]);
    }

    /**
     * ADMIN: Upload/Replace logo
     * Konsep final:
     * - Upload baru dulu (harus sukses)
     * - Kalau ada logo lama -> hapus file lama
     * - Update record yang sama (key=logo)
     */
    public function upsert(UploadNavbarLogoRequest $request)
    {
        $record = NavbarLogo::where('key', self::LOGO_KEY)->first();

        // 1) Simpan file baru dulu (aman)
        $file = $request->file('logo');

        // Folder: storage/app/public/navbar/logo/
        $newPath = $file->store('navbar/logo', 'public');

        // 2) Kalau ada logo lama, hapus file lama (biar tidak jadi sampah)
        if ($record && $record->path && Storage::disk('public')->exists($record->path)) {
            Storage::disk('public')->delete($record->path);
        }

        // 3) Update atau buat record tunggal
        $saved = NavbarLogo::updateOrCreate(
            ['key' => self::LOGO_KEY],
            ['path' => $newPath]
        );

        $this->audit('navbar_logo_upsert', [
            'user_id' => auth()->id(),
            'new_path' => $newPath,
        ]);

        return response()->json([
            'message' => 'Logo navbar berhasil diperbarui.',
            'logo' => [
                'url' => Storage::url($saved->path),
                'updated_at' => $saved->updated_at,
            ],
        ]);
    }

    /**
     * ADMIN: Delete logo custom (hard delete + hapus file)
     * Setelah delete: website otomatis balik ke default statis.
     */
    public function destroy()
    {
        $record = NavbarLogo::where('key', self::LOGO_KEY)->first();

        if (!$record) {
            return response()->json([
                'message' => 'Tidak ada logo custom untuk dihapus. Website sudah memakai logo default.'
            ], 200);
        }

        // Hapus file kalau ada
        if ($record->path && Storage::disk('public')->exists($record->path)) {
            Storage::disk('public')->delete($record->path);
        }

        // Hapus record (hard delete)
        $record->delete();

        $this->audit('navbar_logo_deleted', [
            'user_id' => auth()->id(),
        ]);

        return response()->json([
            'message' => 'Logo custom dihapus. Website kembali memakai logo default.',
            'logo' => [
                'url' => $this->defaultLogoUrl(),
            ],
        ]);
    }
}