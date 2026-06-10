<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('interview', function (Blueprint $table) {
            $table->id();

            $table->foreignId('lamaran_id')
                ->constrained('lamaran')
                ->cascadeOnDelete();

            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->date('tanggal_interview');
            $table->time('jam_interview');
            $table->string('lokasi_interview', 255);
            $table->string('hasil_interview', 100)->nullable();

            $table->timestamps();

            $table->unique('lamaran_id');
            $table->index('tanggal_interview');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('interview');
    }
};