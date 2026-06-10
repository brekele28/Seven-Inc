<?php

namespace App\Notifications\Whatsapp;

use App\Models\Interview;
use App\Models\Lamaran;

class InterviewNotification
{
    public static function message(Lamaran $lamaran, Interview $interview): string
    {
        $nama = $lamaran->pelamar?->nama_lengkap ?? 'Pelamar';
        $posisi = $lamaran->lowongan?->judul_lowongan ?? 'posisi yang dilamar';
        $tanggal = optional($interview->tanggal_interview)->format('d/m/Y');
        $jam = substr((string) $interview->jam_interview, 0, 5);

        return "Halo {$nama},\n\n"
            . "Selamat, lamaran kamu untuk posisi *{$posisi}* telah masuk tahap *Interview*.\n\n"
            . "Jadwal Interview:\n"
            . "Tanggal: {$tanggal}\n"
            . "Jam: {$jam} WIB\n"
            . "Lokasi/Media: {$interview->lokasi_interview}\n\n"
            . "Kode Lamaran: {$lamaran->kode_lamaran}\n\n"
            . "Mohon hadir tepat waktu dan pastikan nomor WhatsApp kamu aktif.\n\n"
            . "Terima kasih,\n"
            . "HRD Seven Inc";
    }
}