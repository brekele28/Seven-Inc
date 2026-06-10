<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lamaran extends Model
{
    protected $table = 'lamaran';

    protected $fillable = [
        'kode_lamaran',
        'pelamar_id',
        'lowongan_id',
        'status_lamaran_id',
        'tanggal_lamaran',
        'tanggal_review',
        'reviewed_by',
        'batas_anti_ghosting',
    ];

    protected function casts(): array
    {
        return [
            'tanggal_lamaran' => 'datetime',
            'tanggal_review' => 'datetime',
            'batas_anti_ghosting' => 'datetime',
        ];
    }

    public function pelamar()
    {
        return $this->belongsTo(Pelamar::class, 'pelamar_id');
    }

    public function lowongan()
    {
        return $this->belongsTo(Lowongan::class, 'lowongan_id');
    }

    public function statusLamaran()
    {
        return $this->belongsTo(StatusLamaran::class, 'status_lamaran_id');
    }

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function dokumen()
    {
        return $this->hasMany(DokumenLamaran::class, 'lamaran_id');
    }

    public function cv()
    {
        return $this->hasOne(DokumenLamaran::class, 'lamaran_id')
            ->where('jenis_dokumen', 'cv');
    }

    public function interview()
    {
        return $this->hasOne(Interview::class, 'lamaran_id');
    }

    public function notifikasi()
    {
        return $this->hasMany(Notifikasi::class, 'lamaran_id');
    }

    public function dataPenerimaanKaryawan()
    {
        return $this->hasOne(DataPenerimaanKaryawan::class, 'lamaran_id');
    }
}