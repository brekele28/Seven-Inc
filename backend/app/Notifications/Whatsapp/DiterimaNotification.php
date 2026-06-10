<?php

namespace App\Notifications\Whatsapp;

use App\Models\DataPenerimaanKaryawan;
use App\Models\Lamaran;

class DiterimaNotification
{
    public static function message(Lamaran $lamaran, DataPenerimaanKaryawan $data, ?string $pesanTambahan = null): string
    {
        $nama = $lamaran->pelamar?->nama_lengkap ?? 'Pelamar';
        $posisi = $lamaran->lowongan?->judul_lowongan ?? 'posisi yang dilamar';
        $tanggalMulai = $data->tanggal_mulai_kerja
            ? $data->tanggal_mulai_kerja->format('d/m/Y')
            : '-';

        $message = "Halo {$nama},\n\n"
            . "Selamat! Kamu dinyatakan *DITERIMA* untuk posisi *{$posisi}* di Seven Inc.\n\n"
            . "Kode Lamaran: {$lamaran->kode_lamaran}\n"
            . "Tanggal Mulai Kerja: {$tanggalMulai}\n\n";

        if ($pesanTambahan) {
            $message .= "{$pesanTambahan}\n\n";
        }

        return $message
            . "Tim HRD akan menghubungi kamu untuk informasi lanjutan.\n\n"
            . "Terima kasih,\n"
            . "HRD Seven Inc";
    }
}