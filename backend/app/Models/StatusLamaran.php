<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StatusLamaran extends Model
{
    protected $table = 'status_lamaran';

    protected $fillable = [
        'nama_status',
        'slug',
        'keterangan',
    ];

    public function lamaran()
    {
        return $this->hasMany(Lamaran::class, 'status_lamaran_id');
    }
}