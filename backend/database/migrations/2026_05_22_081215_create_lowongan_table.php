<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Membuat tabel lowongan.
     */
    public function up(): void
    {
        Schema::create('lowongan', function (Blueprint $table) {
            $table->id();

            /**
             * Admin pembuat lowongan.
             */
            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            /**
             * Informasi utama lowongan.
             */
            $table->string('judul_lowongan', 150);
            $table->text('deskripsi');
            $table->json('kualifikasi');

            /**
             * Lokasi dibuat fleksibel, tetapi default nanti tetap Seven INC.
             */
            $table->string('lokasi', 150);

            /**
             * Disamakan dengan frontend agar minim refactor:
             * draft, active, closed, expired.
             */
            $table->string('status_lowongan', 50)->default('draft');

            $table->date('tanggal_dibuka');
            $table->date('tanggal_ditutup');

            $table->timestamps();

            $table->index('status_lowongan');
            $table->index('tanggal_dibuka');
            $table->index('tanggal_ditutup');
        });
    }

    /**
     * Menghapus tabel lowongan.
     */
    public function down(): void
    {
        Schema::dropIfExists('lowongan');
    }
};