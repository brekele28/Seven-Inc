<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dokumen_lamaran', function (Blueprint $table) {
            $table->id();

            $table->foreignId('lamaran_id')
                ->constrained('lamaran')
                ->cascadeOnDelete();

            $table->string('jenis_dokumen', 50)->default('cv');
            $table->string('nama_file');
            $table->string('path_file');
            $table->string('tipe_file', 100)->nullable();
            $table->unsignedBigInteger('ukuran_file')->default(0);

            $table->timestamps();

            $table->index('lamaran_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dokumen_lamaran');
    }
};