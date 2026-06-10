<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Interview extends Model
{
    protected $table = 'interview';

    protected $fillable = [
        'lamaran_id',
        'user_id',
        'tanggal_interview',
        'jam_interview',
        'lokasi_interview',
        'hasil_interview',
    ];

    protected function casts(): array
    {
        return [
            'tanggal_interview' => 'date',
        ];
    }

    public function lamaran()
    {
        return $this->belongsTo(Lamaran::class, 'lamaran_id');
    }

    public function admin()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}