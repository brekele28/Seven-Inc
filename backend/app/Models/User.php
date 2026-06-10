<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    /**
     * Kolom yang boleh diisi (Mass Assignment)
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * Kolom yang harus disembunyikan agar tidak dicontek orang
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Pengaturan tipe data
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Relasi: satu admin/user bisa membuat banyak lowongan.
     */
    public function lowongan(): HasMany
    {
        return $this->hasMany(Lowongan::class);
    }

    /**
     * Fungsi wajib JWT: Mengambil Kunci Unik Pengguna (ID)
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Fungsi wajib JWT: Menyisipkan catatan jabatan ke dalam Gelang Ajaib
     */
    public function getJWTCustomClaims()
    {
        return [
            'role' => $this->role,
        ];
    }
}