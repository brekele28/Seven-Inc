<?php

namespace App\Notifications\Whatsapp;

use App\Models\Lamaran;

class DitolakNotification
{
    public static function message(Lamaran $lamaran, ?string $alasan = null): string
    {
        $nama = $lamaran->pelamar?->nama_lengkap ?? 'Pelamar';
        $posisi = $lamaran->lowongan?->judul_lowongan ?? 'posisi yang dilamar';

        $message = "Halo {$nama},\n\n"
            . "Terima kasih sudah melamar untuk posisi *{$posisi}* di Seven Inc.\n\n"
            . "Setelah proses review, saat ini kamu belum dapat kami lanjutkan ke tahap berikutnya.\n\n";

        if ($alasan) {
            $message .= "Catatan HRD:\n{$alasan}\n\n";
        }

        return $message
            . "Tetap semangat dan jangan ragu untuk melamar kembali pada kesempatan berikutnya.\n\n"
            . "Kode Lamaran: {$lamaran->kode_lamaran}\n\n"
            . "HRD Seven Inc";
    }
}