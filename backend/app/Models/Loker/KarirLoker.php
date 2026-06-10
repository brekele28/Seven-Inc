<?php

namespace App\Models\Loker;

use Illuminate\Database\Eloquent\Model;

class KarirLoker extends Model
{
    protected $table = 'karir_loker';

    protected $fillable = [
        'hero_badge',
        'hero_title',
        'hero_description',
        'hero_image',
        'jobs_badge',
        'jobs_title',
    ];
}