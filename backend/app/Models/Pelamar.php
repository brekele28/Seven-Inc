<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pelamar extends Model
{
    protected $table = 'pelamar';

    protected $fillable = [
        'kode_pelamar',
        'nama_lengkap',
        'email',
        'no_whatsapp',
        'jenis_kelamin',
        'tempat_lahir',
        'tanggal_lahir',
        'alamat',
    ];

    protected function casts(): array
    {
        return [
            'tanggal_lahir' => 'date',
        ];
    }

    public function lamaran()
    {
        return $this->hasMany(Lamaran::class, 'pelamar_id');
    }
}