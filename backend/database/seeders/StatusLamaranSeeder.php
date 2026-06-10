<?php

namespace Database\Seeders;

use App\Models\StatusLamaran;
use Illuminate\Database\Seeder;

class StatusLamaranSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = [
            [
                'nama_status' => 'Lamaran Baru',
                'slug' => 'lamaran-baru',
                'keterangan' => 'Lamaran baru masuk dan menunggu review HRD.',
            ],
            [
                'nama_status' => 'Seleksi Administrasi',
                'slug' => 'seleksi-administrasi',
                'keterangan' => 'Pelamar sedang masuk tahap seleksi administrasi.',
            ],
            [
                'nama_status' => 'Interview',
                'slug' => 'interview',
                'keterangan' => 'Pelamar masuk tahap interview.',
            ],
            [
                'nama_status' => 'Diterima',
                'slug' => 'diterima',
                'keterangan' => 'Pelamar dinyatakan diterima.',
            ],
            [
                'nama_status' => 'Ditolak',
                'slug' => 'ditolak',
                'keterangan' => 'Pelamar belum berhasil pada proses rekrutmen.',
            ],
            [
                'nama_status' => 'Expired',
                'slug' => 'expired',
                'keterangan' => 'Lamaran melewati batas waktu anti-ghosting.',
            ],
        ];

        foreach ($statuses as $status) {
            StatusLamaran::updateOrCreate(
                ['slug' => $status['slug']],
                $status
            );
        }
    }
}