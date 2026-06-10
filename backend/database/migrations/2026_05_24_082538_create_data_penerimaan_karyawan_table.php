<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('data_penerimaan_karyawan', function (Blueprint $table) {
            $table->id();

            $table->foreignId('lamaran_id')
                ->constrained('lamaran')
                ->cascadeOnDelete();

            $table->foreignId('pelamar_id')
                ->constrained('pelamar')
                ->cascadeOnDelete();

            $table->foreignId('lowongan_id')
                ->constrained('lowongan')
                ->cascadeOnDelete();

            $table->string('nama_lengkap', 150);
            $table->string('email', 150);
            $table->string('no_whatsapp', 30);
            $table->string('posisi_diterima', 150);
            $table->date('tanggal_diterima');
            $table->date('tanggal_mulai_kerja')->nullable();

            $table->timestamps();

            $table->unique('lamaran_id');
            $table->index('pelamar_id');
            $table->index('lowongan_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('data_penerimaan_karyawan');
    }
};