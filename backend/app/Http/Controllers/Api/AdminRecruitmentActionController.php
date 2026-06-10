<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ScheduleInterviewRequest;
use App\Http\Requests\TerimaLamaranRequest;
use App\Http\Requests\TolakLamaranRequest;
use App\Models\DataPenerimaanKaryawan;
use App\Models\Interview;
use App\Models\Lamaran;
use App\Models\Notifikasi;
use App\Models\StatusLamaran;
use App\Notifications\Whatsapp\DiterimaNotification;
use App\Notifications\Whatsapp\DitolakNotification;
use App\Notifications\Whatsapp\ExpiredNotification;
use App\Notifications\Whatsapp\InterviewNotification;
use App\Services\Whatsapp\FonnteService;
use Illuminate\Support\Facades\DB;

class AdminRecruitmentActionController extends Controller
{
    public function scheduleInterview(ScheduleInterviewRequest $request, Lamaran $lamaran, FonnteService $fonnte)
    {
        $lamaran->load(['pelamar', 'lowongan', 'statusLamaran']);

        $interview = DB::transaction(function () use ($request, $lamaran) {
            $status = $this->getStatusBySlug('interview');

            $interview = Interview::updateOrCreate(
                ['lamaran_id' => $lamaran->id],
                [
                    'user_id' => auth()->id(),
                    'tanggal_interview' => $request->tanggal_interview,
                    'jam_interview' => $request->jam_interview,
                    'lokasi_interview' => $request->lokasi_interview,
                    'hasil_interview' => null,
                ]
            );

            $lamaran->update([
                'status_lamaran_id' => $status->id,
                'tanggal_review' => now(),
                'reviewed_by' => auth()->id(),
            ]);

            return $interview;
        });

        $lamaran->refresh()->load(['pelamar', 'lowongan', 'statusLamaran', 'interview']);

        $message = InterviewNotification::message($lamaran, $interview);
        $this->sendAndLog($fonnte, $lamaran, 'interview', $message);

        return response()->json([
            'message' => 'Jadwal interview berhasil dibuat dan notifikasi WhatsApp diproses.',
            'data' => [
                'lamaran' => $this->formatLamaran($lamaran),
                'interview' => $this->formatInterview($interview),
            ],
        ]);
    }

    public function accept(TerimaLamaranRequest $request, Lamaran $lamaran, FonnteService $fonnte)
    {
        $lamaran->load(['pelamar', 'lowongan', 'statusLamaran']);

        $dataPenerimaan = DB::transaction(function () use ($request, $lamaran) {
            $status = $this->getStatusBySlug('diterima');

            $lamaran->update([
                'status_lamaran_id' => $status->id,
                'tanggal_review' => now(),
                'reviewed_by' => auth()->id(),
            ]);

            return DataPenerimaanKaryawan::updateOrCreate(
                ['lamaran_id' => $lamaran->id],
                [
                    'pelamar_id' => $lamaran->pelamar_id,
                    'lowongan_id' => $lamaran->lowongan_id,
                    'nama_lengkap' => $lamaran->pelamar?->nama_lengkap,
                    'email' => $lamaran->pelamar?->email,
                    'no_whatsapp' => $lamaran->pelamar?->no_whatsapp,
                    'posisi_diterima' => $lamaran->lowongan?->judul_lowongan,
                    'tanggal_diterima' => now()->toDateString(),
                    'tanggal_mulai_kerja' => $request->tanggal_mulai_kerja,
                ]
            );
        });

        $lamaran->refresh()->load(['pelamar', 'lowongan', 'statusLamaran', 'dataPenerimaanKaryawan']);

        $message = DiterimaNotification::message(
            $lamaran,
            $dataPenerimaan,
            $request->pesan_tambahan
        );

        $this->sendAndLog($fonnte, $lamaran, 'diterima', $message);

        return response()->json([
            'message' => 'Pelamar berhasil diterima, data penerimaan dibuat, dan notifikasi WhatsApp diproses.',
            'data' => [
                'lamaran' => $this->formatLamaran($lamaran),
                'penerimaan' => $this->formatPenerimaan($dataPenerimaan),
            ],
        ]);
    }

    public function reject(TolakLamaranRequest $request, Lamaran $lamaran, FonnteService $fonnte)
    {
        $lamaran->load(['pelamar', 'lowongan', 'statusLamaran']);

        DB::transaction(function () use ($lamaran) {
            $status = $this->getStatusBySlug('ditolak');

            $lamaran->update([
                'status_lamaran_id' => $status->id,
                'tanggal_review' => now(),
                'reviewed_by' => auth()->id(),
            ]);
        });

        $lamaran->refresh()->load(['pelamar', 'lowongan', 'statusLamaran']);

        $message = DitolakNotification::message($lamaran, $request->alasan);
        $this->sendAndLog($fonnte, $lamaran, 'ditolak', $message);

        return response()->json([
            'message' => 'Pelamar berhasil ditolak dan notifikasi WhatsApp diproses.',
            'data' => $this->formatLamaran($lamaran),
        ]);
    }

    public function expire(Lamaran $lamaran, FonnteService $fonnte)
    {
        $lamaran->load(['pelamar', 'lowongan', 'statusLamaran']);

        DB::transaction(function () use ($lamaran) {
            $status = $this->getStatusBySlug('expired');

            $lamaran->update([
                'status_lamaran_id' => $status->id,
                'tanggal_review' => now(),
                'reviewed_by' => auth()->id(),
            ]);
        });

        $lamaran->refresh()->load(['pelamar', 'lowongan', 'statusLamaran']);

        $message = ExpiredNotification::message($lamaran);
        $this->sendAndLog($fonnte, $lamaran, 'expired', $message);

        return response()->json([
            'message' => 'Lamaran berhasil diubah menjadi expired dan notifikasi WhatsApp diproses.',
            'data' => $this->formatLamaran($lamaran),
        ]);
    }

    private function sendAndLog(FonnteService $fonnte, Lamaran $lamaran, string $jenis, string $message): Notifikasi
    {
        $phone = $lamaran->pelamar?->no_whatsapp ?? '';

        $result = $fonnte->sendMessage($phone, $message);

        return Notifikasi::create([
            'lamaran_id' => $lamaran->id,
            'no_whatsapp' => $phone,
            'jenis_notifikasi' => $jenis,
            'isi_pesan' => $message,
            'status_kirim' => $result['success'] ? 'sent' : 'failed',
            'response_gateway' => $result,
            'sent_at' => $result['success'] ? now() : null,
        ]);
    }

    private function getStatusBySlug(string $slug): StatusLamaran
    {
        return StatusLamaran::where('slug', $slug)->firstOrFail();
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
                'nama_lengkap' => $lamaran->pelamar?->nama_lengkap,
                'email' => $lamaran->pelamar?->email,
                'no_whatsapp' => $lamaran->pelamar?->no_whatsapp,
            ],
            'lowongan' => [
                'id' => $lamaran->lowongan?->id,
                'judul_lowongan' => $lamaran->lowongan?->judul_lowongan,
            ],
        ];
    }

    private function formatInterview(Interview $interview): array
    {
        return [
            'id' => $interview->id,
            'tanggal_interview' => optional($interview->tanggal_interview)->toDateString(),
            'jam_interview' => substr((string) $interview->jam_interview, 0, 5),
            'lokasi_interview' => $interview->lokasi_interview,
            'hasil_interview' => $interview->hasil_interview,
        ];
    }

    private function formatPenerimaan(DataPenerimaanKaryawan $data): array
    {
        return [
            'id' => $data->id,
            'nama_lengkap' => $data->nama_lengkap,
            'email' => $data->email,
            'no_whatsapp' => $data->no_whatsapp,
            'posisi_diterima' => $data->posisi_diterima,
            'tanggal_diterima' => optional($data->tanggal_diterima)->toDateString(),
            'tanggal_mulai_kerja' => optional($data->tanggal_mulai_kerja)->toDateString(),
        ];
    }
}