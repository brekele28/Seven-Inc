<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLowonganRequest;
use App\Http\Requests\UpdateLowonganRequest;
use App\Models\Lowongan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LowonganController extends Controller
{
    private const COMPANY = 'Seven INC';
    private const LOCATION = 'Bantul, Kabupaten Bantul, Daerah Istimewa Yogyakarta';

    private function audit(string $event, array $context = []): void
    {
        Log::info('[SECURITY_AUDIT]', array_merge([
            'event' => $event,
            'ip' => request()->ip(),
            'ua' => substr((string) request()->userAgent(), 0, 255),
        ], $context));
    }

    private function normalizeSections(array $sections): array
    {
        return collect($sections)
            ->map(function ($section, $index) {
                $items = collect($section['items'] ?? [])
                    ->map(fn ($item) => trim((string) $item))
                    ->filter()
                    ->values()
                    ->all();

                return [
                    'id' => trim((string) ($section['id'] ?? 'section-' . ($index + 1))),
                    'title' => trim((string) ($section['title'] ?? 'SEKSI')),
                    'items' => $items,
                ];
            })
            ->filter(fn ($section) => $section['title'] !== '' && count($section['items']) > 0)
            ->values()
            ->all();
    }

    private function getApplicantCount(Lowongan $lowongan): int
    {
        if (array_key_exists('lamaran_count', $lowongan->getAttributes())) {
            return (int) $lowongan->lamaran_count;
        }

        if ($lowongan->relationLoaded('lamaran')) {
            return $lowongan->lamaran->count();
        }

        return (int) $lowongan->lamaran()->count();
    }

    private function formatLowongan(Lowongan $lowongan): array
    {
        return [
            'id' => (string) $lowongan->id,
            'title' => $lowongan->judul_lowongan,
            'company' => self::COMPANY,
            'location' => $lowongan->lokasi,
            'openedAt' => optional($lowongan->tanggal_dibuka)->format('Y-m-d'),
            'closedAt' => optional($lowongan->tanggal_ditutup)->format('Y-m-d'),
            'status' => $lowongan->computed_status,
            'applicantCount' => $this->getApplicantCount($lowongan),
            'intro' => $lowongan->deskripsi,
            'sections' => $lowongan->kualifikasi ?? [],
            'meta' => [
                'position' => $lowongan->judul_lowongan,
                'location' => $lowongan->lokasi,
                'closeDate' => 'Close Date :' . optional($lowongan->tanggal_ditutup)->translatedFormat('d F Y'),
            ],
            'createdAt' => optional($lowongan->created_at)->toISOString(),
            'updatedAt' => optional($lowongan->updated_at)->toISOString(),
        ];
    }

    private function baseQuery()
    {
        return Lowongan::query()
            ->withCount('lamaran')
            ->latest('created_at');
    }

    /**
     * PUBLIC: list lowongan aktif untuk halaman user.
     */
    public function publicIndex(Request $request)
    {
        $limit = max(1, min((int) $request->query('limit', 10), 50));

        $items = Lowongan::query()
            ->withCount('lamaran')
            ->where('status_lowongan', 'active')
            ->whereDate('tanggal_dibuka', '<=', now()->toDateString())
            ->whereDate('tanggal_ditutup', '>=', now()->toDateString())
            ->latest('tanggal_dibuka')
            ->paginate($limit);

        return response()->json([
            'message' => 'Data lowongan aktif berhasil diambil.',
            'data' => collect($items->items())
                ->map(fn (Lowongan $lowongan) => $this->formatLowongan($lowongan))
                ->values(),
            'meta' => [
                'current_page' => $items->currentPage(),
                'per_page' => $items->perPage(),
                'total' => $items->total(),
                'last_page' => $items->lastPage(),
            ],
        ]);
    }

    /**
     * PUBLIC: detail lowongan aktif untuk halaman detail user.
     */
    public function publicShow(Lowongan $lowongan)
    {
        if (
            $lowongan->computed_status !== 'active' ||
            $lowongan->tanggal_dibuka->isFuture() ||
            $lowongan->tanggal_ditutup->isPast() && !$lowongan->tanggal_ditutup->isToday()
        ) {
            return response()->json([
                'message' => 'Lowongan tidak ditemukan atau sudah tidak aktif.',
            ], 404);
        }

        $lowongan->loadCount('lamaran');

        return response()->json([
            'message' => 'Detail lowongan berhasil diambil.',
            'data' => $this->formatLowongan($lowongan),
        ]);
    }

    /**
     * ADMIN: list semua lowongan.
     */
    public function index(Request $request)
    {
        $query = $this->baseQuery();

        if ($request->filled('status') && $request->query('status') !== 'all') {
            $query->where('status_lowongan', $request->query('status'));
        }

        if ($request->filled('q')) {
            $keyword = trim((string) $request->query('q'));

            $query->where(function ($q) use ($keyword) {
                $q->where('judul_lowongan', 'like', "%{$keyword}%")
                    ->orWhere('deskripsi', 'like', "%{$keyword}%");
            });
        }

        $items = $query->get();

        return response()->json([
            'message' => 'Data lowongan berhasil diambil.',
            'data' => $items
                ->map(fn (Lowongan $lowongan) => $this->formatLowongan($lowongan))
                ->values(),
        ]);
    }

    /**
     * ADMIN: simpan lowongan baru.
     */
    public function store(StoreLowonganRequest $request)
    {
        $payload = $request->validated();

        $lowongan = Lowongan::create([
            'user_id' => auth()->id(),
            'judul_lowongan' => $payload['title'],
            'deskripsi' => $payload['intro'],
            'kualifikasi' => $this->normalizeSections($payload['sections']),
            'lokasi' => self::LOCATION,
            'status_lowongan' => $payload['status'],
            'tanggal_dibuka' => $payload['openedAt'],
            'tanggal_ditutup' => $payload['closedAt'],
        ]);

        $lowongan->loadCount('lamaran');

        $this->audit('lowongan_created', [
            'user_id' => auth()->id(),
            'lowongan_id' => $lowongan->id,
        ]);

        return response()->json([
            'message' => 'Lowongan berhasil dibuat.',
            'data' => $this->formatLowongan($lowongan),
        ], 201);
    }

    /**
     * ADMIN: detail lowongan.
     */
    public function show(Lowongan $lowongan)
    {
        $lowongan->loadCount('lamaran');

        return response()->json([
            'message' => 'Detail lowongan berhasil diambil.',
            'data' => $this->formatLowongan($lowongan),
        ]);
    }

    /**
     * ADMIN: update lowongan.
     */
    public function update(UpdateLowonganRequest $request, Lowongan $lowongan)
    {
        $payload = $request->validated();

        $lowongan->update([
            'judul_lowongan' => $payload['title'],
            'deskripsi' => $payload['intro'],
            'kualifikasi' => $this->normalizeSections($payload['sections']),
            'lokasi' => self::LOCATION,
            'status_lowongan' => $payload['status'],
            'tanggal_dibuka' => $payload['openedAt'],
            'tanggal_ditutup' => $payload['closedAt'],
        ]);

        $freshLowongan = $lowongan->fresh();
        $freshLowongan->loadCount('lamaran');

        $this->audit('lowongan_updated', [
            'user_id' => auth()->id(),
            'lowongan_id' => $lowongan->id,
        ]);

        return response()->json([
            'message' => 'Lowongan berhasil diperbarui.',
            'data' => $this->formatLowongan($freshLowongan),
        ]);
    }

    /**
     * ADMIN: terbitkan lowongan.
     */
    public function publish(Lowongan $lowongan)
    {
        $lowongan->update([
            'status_lowongan' => 'active',
        ]);

        $freshLowongan = $lowongan->fresh();
        $freshLowongan->loadCount('lamaran');

        $this->audit('lowongan_published', [
            'user_id' => auth()->id(),
            'lowongan_id' => $lowongan->id,
        ]);

        return response()->json([
            'message' => 'Lowongan berhasil diterbitkan.',
            'data' => $this->formatLowongan($freshLowongan),
        ]);
    }

    /**
     * ADMIN: tutup lowongan.
     */
    public function close(Lowongan $lowongan)
    {
        $lowongan->update([
            'status_lowongan' => 'closed',
        ]);

        $freshLowongan = $lowongan->fresh();
        $freshLowongan->loadCount('lamaran');

        $this->audit('lowongan_closed', [
            'user_id' => auth()->id(),
            'lowongan_id' => $lowongan->id,
        ]);

        return response()->json([
            'message' => 'Lowongan berhasil ditutup.',
            'data' => $this->formatLowongan($freshLowongan),
        ]);
    }

    /**
     * ADMIN: hapus lowongan.
     */
    public function destroy(Lowongan $lowongan)
    {
        $lowonganId = $lowongan->id;

        $lowongan->delete();

        $this->audit('lowongan_deleted', [
            'user_id' => auth()->id(),
            'lowongan_id' => $lowonganId,
        ]);

        return response()->json([
            'message' => 'Lowongan berhasil dihapus.',
        ]);
    }
}