<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DokumenLamaran extends Model
{
    protected $table = 'dokumen_lamaran';

    protected $fillable = [
        'lamaran_id',
        'jenis_dokumen',
        'nama_file',
        'path_file',
        'tipe_file',
        'ukuran_file',
    ];

    public function lamaran()
    {
        return $this->belongsTo(Lamaran::class, 'lamaran_id');
    }
}