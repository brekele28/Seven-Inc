<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lamaran', function (Blueprint $table) {
            $table->id();
            $table->string('kode_lamaran', 50)->unique();

            $table->foreignId('pelamar_id')
                ->constrained('pelamar')
                ->cascadeOnDelete();

            $table->foreignId('lowongan_id')
                ->constrained('lowongan')
                ->cascadeOnDelete();

            $table->foreignId('status_lamaran_id')
                ->constrained('status_lamaran');

            $table->timestamp('tanggal_lamaran')->nullable();
            $table->timestamp('tanggal_review')->nullable();

            $table->foreignId('reviewed_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamp('batas_anti_ghosting')->nullable();

            $table->timestamps();

            $table->unique(['pelamar_id', 'lowongan_id']);
            $table->index('kode_lamaran');
            $table->index('tanggal_lamaran');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lamaran');
    }
};