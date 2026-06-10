<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('karir_loker', function (Blueprint $table) {
            $table->id();
            $table->string('hero_badge', 100);
            $table->string('hero_title', 255);
            $table->text('hero_description');
            $table->string('hero_image', 255)->nullable();
            $table->string('jobs_badge', 100);
            $table->string('jobs_title', 255);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('karir_loker');
    }
};