<?php

namespace App\Notifications\Whatsapp;

use App\Models\Lamaran;

class ExpiredNotification
{
    public static function message(Lamaran $lamaran): string
    {
        $nama = $lamaran->pelamar?->nama_lengkap ?? 'Pelamar';
        $posisi = $lamaran->lowongan?->judul_lowongan ?? 'posisi yang dilamar';

        return "Halo {$nama},\n\n"
            . "Terima kasih sudah melamar untuk posisi *{$posisi}* di Seven Inc.\n\n"
            . "Saat ini lamaran kamu belum dapat kami lanjutkan karena sudah melewati batas waktu proses seleksi otomatis.\n\n"
            . "Status lamaran kamu: *Expired / Belum Berhasil*.\n"
            . "Kode Lamaran: {$lamaran->kode_lamaran}\n\n"
            . "Tetap semangat dan semoga sukses untuk kesempatan berikutnya.\n\n"
            . "HRD Seven Inc";
    }
}