<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateStatusLamaranRequest;
use App\Models\Lamaran;
use App\Models\StatusLamaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AdminPelamarController extends Controller
{
    public function index(Request $request)
    {
        $query = Lamaran::with([
            'pelamar',
            'lowongan',
            'statusLamaran',
            'cv',
            'interview',
            'dataPenerimaanKaryawan',
        ])
            ->latest();

        if ($request->filled('q')) {
            $keyword = $request->q;

            $query->where(function ($q) use ($keyword) {
                $q->where('kode_lamaran', 'like', "%{$keyword}%")
                    ->orWhereHas('pelamar', function ($pelamar) use ($keyword) {
                        $pelamar->where('nama_lengkap', 'like', "%{$keyword}%")
                            ->orWhere('email', 'like', "%{$keyword}%")
                            ->orWhere('no_whatsapp', 'like', "%{$keyword}%");
                    })
                    ->orWhereHas('lowongan', function ($lowongan) use ($keyword) {
                        $lowongan->where('judul_lowongan', 'like', "%{$keyword}%");
                    });
            });
        }

        if ($request->filled('status')) {
            $query->whereHas('statusLamaran', function ($status) use ($request) {
                $status->where('slug', $request->status);
            });
        }

        if ($request->filled('lowongan_id')) {
            $query->where('lowongan_id', $request->lowongan_id);
        }

        $perPage = (int) $request->get('per_page', 10);

        $data = $query->paginate($perPage);

        return response()->json([
            'message' => 'Data pelamar berhasil diambil.',
            'data' => $data->through(fn($lamaran) => $this->formatLamaran($lamaran)),
        ]);
    }

    public function show(int $id)
    {
        $lamaran = Lamaran::with([
            'pelamar',
            'lowongan',
            'statusLamaran',
            'cv',
            'reviewer',
            'interview',
            'dataPenerimaanKaryawan',
        ])
            ->find($id);

        if (!$lamaran) {
            return response()->json([
                'message' => 'Data lamaran tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'message' => 'Detail pelamar berhasil diambil.',
            'data' => $this->formatLamaran($lamaran),
        ]);
    }

    public function updateStatus(UpdateStatusLamaranRequest $request, int $id)
    {
        $lamaran = Lamaran::find($id);

        if (!$lamaran) {
            return response()->json([
                'message' => 'Data lamaran tidak ditemukan.',
            ], 404);
        }

        $status = StatusLamaran::where('slug', $request->status_slug)->firstOrFail();

        $lamaran->update([
            'status_lamaran_id' => $status->id,
            'tanggal_review' => now(),
            'reviewed_by' => auth()->id(),
        ]);

        $lamaran->load([
            'pelamar',
            'lowongan',
            'statusLamaran',
            'cv',
            'reviewer',
            'interview',
            'dataPenerimaanKaryawan',
        ]);

        return response()->json([
            'message' => 'Status lamaran berhasil diperbarui.',
            'data' => $this->formatLamaran($lamaran),
        ]);
    }

    public function destroy(int $id)
    {
        $lamaran = Lamaran::with([
            'statusLamaran',
            'dokumen',
        ])
            ->find($id);

        if (!$lamaran) {
            return response()->json([
                'message' => 'Data lamaran tidak ditemukan.',
            ], 404);
        }

        $statusSlug = $lamaran->statusLamaran?->slug;

        if (!in_array($statusSlug, ['ditolak', 'expired'], true)) {
            return response()->json([
                'message' => 'Data hanya dapat dihapus jika status lamaran Ditolak atau Expired.',
            ], 422);
        }

        $documentPaths = $lamaran->dokumen
            ->pluck('path_file')
            ->filter()
            ->values()
            ->all();

        DB::transaction(function () use ($lamaran) {
            $lamaran->delete();
        });

        foreach ($documentPaths as $path) {
            if ($path && Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }
        }

        return response()->json([
            'message' => 'Data lamaran berhasil dihapus.',
        ]);
    }

    private function formatLamaran(Lamaran $lamaran): array
    {
        $interview = $lamaran->interview ?? null;
        $penerimaan = $lamaran->dataPenerimaanKaryawan ?? null;

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

            'reviewer' => $lamaran->reviewer ? [
                'id' => $lamaran->reviewer->id,
                'name' => $lamaran->reviewer->name,
                'email' => $lamaran->reviewer->email,
            ] : null,

            'interview' => $interview ? [
                'id' => $interview->id,
                'tanggal_interview' => optional($interview->tanggal_interview)->toDateString(),
                'jam_interview' => substr((string) $interview->jam_interview, 0, 5),
                'lokasi_interview' => $interview->lokasi_interview,
                'hasil_interview' => $interview->hasil_interview,
            ] : null,

            'penerimaan' => $penerimaan ? [
                'id' => $penerimaan->id,
                'nama_lengkap' => $penerimaan->nama_lengkap,
                'email' => $penerimaan->email,
                'no_whatsapp' => $penerimaan->no_whatsapp,
                'posisi_diterima' => $penerimaan->posisi_diterima,
                'tanggal_diterima' => optional($penerimaan->tanggal_diterima)->toDateString(),
                'tanggal_mulai_kerja' => optional($penerimaan->tanggal_mulai_kerja)->toDateString(),
                'created_at' => optional($penerimaan->created_at)->toDateTimeString(),
                'updated_at' => optional($penerimaan->updated_at)->toDateTimeString(),
            ] : null,

            'dataPenerimaanKaryawan' => $penerimaan ? [
                'id' => $penerimaan->id,
                'nama_lengkap' => $penerimaan->nama_lengkap,
                'email' => $penerimaan->email,
                'no_whatsapp' => $penerimaan->no_whatsapp,
                'posisi_diterima' => $penerimaan->posisi_diterima,
                'tanggal_diterima' => optional($penerimaan->tanggal_diterima)->toDateString(),
                'tanggal_mulai_kerja' => optional($penerimaan->tanggal_mulai_kerja)->toDateString(),
                'created_at' => optional($penerimaan->created_at)->toDateTimeString(),
                'updated_at' => optional($penerimaan->updated_at)->toDateTimeString(),
            ] : null,

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