<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DataPenerimaanKaryawan extends Model
{
    protected $table = 'data_penerimaan_karyawan';

    protected $fillable = [
        'lamaran_id',
        'pelamar_id',
        'lowongan_id',
        'nama_lengkap',
        'email',
        'no_whatsapp',
        'posisi_diterima',
        'tanggal_diterima',
        'tanggal_mulai_kerja',
    ];

    protected function casts(): array
    {
        return [
            'tanggal_diterima' => 'date',
            'tanggal_mulai_kerja' => 'date',
        ];
    }

    public function lamaran()
    {
        return $this->belongsTo(Lamaran::class, 'lamaran_id');
    }

    public function pelamar()
    {
        return $this->belongsTo(Pelamar::class, 'pelamar_id');
    }

    public function lowongan()
    {
        return $this->belongsTo(Lowongan::class, 'lowongan_id');
    }
}