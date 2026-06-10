<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lowongan extends Model
{
    protected $table = 'lowongan';

    protected $fillable = [
        'user_id',
        'judul_lowongan',
        'deskripsi',
        'kualifikasi',
        'lokasi',
        'status_lowongan',
        'tanggal_dibuka',
        'tanggal_ditutup',
    ];

    protected function casts(): array
    {
        return [
            'kualifikasi' => 'array',
            'tanggal_dibuka' => 'date',
            'tanggal_ditutup' => 'date',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function lamaran(): HasMany
    {
        return $this->hasMany(Lamaran::class, 'lowongan_id');
    }

    public function getComputedStatusAttribute(): string
    {
        if (in_array($this->status_lowongan, ['draft', 'closed', 'expired'], true)) {
            return $this->status_lowongan;
        }

        if ($this->tanggal_ditutup && $this->tanggal_ditutup->isPast() && !$this->tanggal_ditutup->isToday()) {
            return 'expired';
        }

        return $this->status_lowongan;
    }
}