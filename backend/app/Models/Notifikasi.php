<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notifikasi extends Model
{
    protected $table = 'notifikasi';

    protected $fillable = [
        'lamaran_id',
        'no_whatsapp',
        'jenis_notifikasi',
        'isi_pesan',
        'status_kirim',
        'response_gateway',
        'sent_at',
    ];

    protected function casts(): array
    {
        return [
            'response_gateway' => 'array',
            'sent_at' => 'datetime',
        ];
    }

    public function lamaran()
    {
        return $this->belongsTo(Lamaran::class, 'lamaran_id');
    }
}