<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLamaranRequest;
use App\Models\DokumenLamaran;
use App\Models\Lamaran;
use App\Models\Lowongan;
use App\Models\Pelamar;
use App\Models\StatusLamaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PublicLamaranController extends Controller
{
    public function store(StoreLamaranRequest $request)
    {
        $lowongan = Lowongan::where('id', $request->lowongan_id)
            ->where('status_lowongan', 'active')
            ->first();

        if (!$lowongan) {
            return response()->json([
                'message' => 'Lowongan tidak aktif atau tidak ditemukan.',
            ], 404);
        }

        if ($lowongan->tanggal_ditutup && now()->startOfDay()->gt($lowongan->tanggal_ditutup)) {
            return response()->json([
                'message' => 'Lowongan ini sudah ditutup.',
            ], 422);
        }

        try {
            $lamaran = DB::transaction(function () use ($request, $lowongan) {
                $pelamar = Pelamar::firstOrCreate(
                    [
                        'email' => $request->email,
                        'no_whatsapp' => $this->normalizePhone($request->no_whatsapp),
                    ],
                    [
                        'kode_pelamar' => $this->generateKodePelamar(),
                        'nama_lengkap' => $request->nama_lengkap,
                        'jenis_kelamin' => $request->jenis_kelamin,
                        'tempat_lahir' => $request->tempat_lahir,
                        'tanggal_lahir' => $request->tanggal_lahir,
                        'alamat' => $request->alamat,
                    ]
                );

                $existing = Lamaran::where('pelamar_id', $pelamar->id)
                    ->where('lowongan_id', $lowongan->id)
                    ->first();

                if ($existing) {
                    abort(response()->json([
                        'message' => 'Kamu sudah pernah melamar pada lowongan ini.',
                    ], 422));
                }

                $statusBaru = StatusLamaran::where('slug', 'lamaran-baru')->firstOrFail();

                $lamaran = Lamaran::create([
                    'kode_lamaran' => $this->generateKodeLamaran(),
                    'pelamar_id' => $pelamar->id,
                    'lowongan_id' => $lowongan->id,
                    'status_lamaran_id' => $statusBaru->id,
                    'tanggal_lamaran' => now(),
                    'batas_anti_ghosting' => now()->addDays(7),
                ]);

                $file = $request->file('cv_pdf');
                $path = $file->store('lamaran/cv', 'public');

                DokumenLamaran::create([
                    'lamaran_id' => $lamaran->id,
                    'jenis_dokumen' => 'cv',
                    'nama_file' => $file->getClientOriginalName(),
                    'path_file' => $path,
                    'tipe_file' => $file->getClientMimeType(),
                    'ukuran_file' => $file->getSize(),
                ]);

                return $lamaran->load(['pelamar', 'lowongan', 'statusLamaran', 'cv']);
            });

            return response()->json([
                'message' => 'Lamaran berhasil dikirim.',
                'data' => $this->formatLamaran($lamaran),
            ], 201);
        } catch (\Throwable $e) {
            if ($e instanceof \Symfony\Component\HttpKernel\Exception\HttpException) {
                throw $e;
            }

            return response()->json([
                'message' => 'Gagal mengirim lamaran.',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }

    public function show(string $kodeLamaran)
    {
        $lamaran = Lamaran::with(['pelamar', 'lowongan', 'statusLamaran', 'cv'])
            ->where('kode_lamaran', $kodeLamaran)
            ->first();

        if (!$lamaran) {
            return response()->json([
                'message' => 'Lamaran tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'message' => 'Detail lamaran berhasil diambil.',
            'data' => $this->formatLamaran($lamaran),
        ]);
    }

    public function searchByPhone(Request $request)
    {
        $request->validate([
            'phone' => ['required', 'string', 'min:8'],
        ]);

        $phone = $this->normalizePhone($request->phone);

        $lamaran = Lamaran::with(['pelamar', 'lowongan', 'statusLamaran', 'cv'])
            ->whereHas('pelamar', function ($query) use ($phone) {
                $query->where('no_whatsapp', $phone);
            })
            ->latest()
            ->get();

        return response()->json([
            'message' => 'Data lamaran berhasil diambil.',
            'data' => $lamaran->map(fn($item) => $this->formatLamaran($item)),
        ]);
    }

    private function generateKodeLamaran(): string
    {
        $year = now()->year;
        $prefix = "7INC-{$year}-";

        $last = Lamaran::where('kode_lamaran', 'like', "{$prefix}%")
            ->orderByDesc('id')
            ->lockForUpdate()
            ->first();

        $lastNumber = 0;

        if ($last) {
            $lastNumber = (int) substr($last->kode_lamaran, -6);
        }

        return $prefix . str_pad($lastNumber + 1, 6, '0', STR_PAD_LEFT);
    }

    private function generateKodePelamar(): string
    {
        $year = now()->year;
        $prefix = "PEL-{$year}-";

        $last = Pelamar::where('kode_pelamar', 'like', "{$prefix}%")
            ->orderByDesc('id')
            ->lockForUpdate()
            ->first();

        $lastNumber = 0;

        if ($last) {
            $lastNumber = (int) substr($last->kode_pelamar, -6);
        }

        return $prefix . str_pad($lastNumber + 1, 6, '0', STR_PAD_LEFT);
    }

    private function normalizePhone(string $phone): string
    {
        $value = preg_replace('/[^\d+]/', '', $phone);

        if (str_starts_with($value, '+62')) {
            return '0' . substr($value, 3);
        }

        if (str_starts_with($value, '62')) {
            return '0' . substr($value, 2);
        }

        return $value;
    }

    private function formatLamaran(Lamaran $lamaran): array
    {
        return [
            'id' => $lamaran->id,
            'kode_lamaran' => $lamaran->kode_lamaran,
            'tanggal_lamaran' => optional($lamaran->tanggal_lamaran)->toDateTimeString(),
            'tanggal_review' => optional($lamaran->tanggal_review)->toDateTimeString(),
            'batas_anti_ghosting' => optional($lamaran->batas_anti_ghosting)->toDateTimeString(),

            'status' => [
                'id' => $lamaran->statusLamaran?->id,
                'nama_status' => $lamaran->statusLamaran?->nama_status,
                'slug' => $lamaran->statusLamaran?->slug,
            ],

            'pelamar' => [
                'id' => $lamaran->pelamar?->id,
                'kode_pelamar' => $lamaran->pelamar?->kode_pelamar,
                'nama_lengkap' => $lamaran->pelamar?->nama_lengkap,
                'email' => $lamaran->pelamar?->email,
                'no_whatsapp' => $lamaran->pelamar?->no_whatsapp,
                'jenis_kelamin' => $lamaran->pelamar?->jenis_kelamin,
                'tempat_lahir' => $lamaran->pelamar?->tempat_lahir,
                'tanggal_lahir' => optional($lamaran->pelamar?->tanggal_lahir)->toDateString(),
                'alamat' => $lamaran->pelamar?->alamat,
            ],

            'lowongan' => [
                'id' => $lamaran->lowongan?->id,
                'judul_lowongan' => $lamaran->lowongan?->judul_lowongan,
                'lokasi' => $lamaran->lowongan?->lokasi,
            ],

            'cv' => $lamaran->cv ? [
                'id' => $lamaran->cv->id,
                'nama_file' => $lamaran->cv->nama_file,
                'url' => str_replace(
                    'http://',
                    'https://',
                    url('/api/public/cv/' . $lamaran->cv->id)
                ),
                'tipe_file' => $lamaran->cv->tipe_file,
                'ukuran_file' => $lamaran->cv->ukuran_file,
            ] : null,
        ];
    }
}