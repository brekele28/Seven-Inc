<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notifikasi', function (Blueprint $table) {
            $table->id();

            $table->foreignId('lamaran_id')
                ->constrained('lamaran')
                ->cascadeOnDelete();

            $table->string('no_whatsapp', 30);
            $table->string('jenis_notifikasi', 50);
            $table->text('isi_pesan');
            $table->string('status_kirim', 50)->default('pending');
            $table->json('response_gateway')->nullable();
            $table->timestamp('sent_at')->nullable();

            $table->timestamps();

            $table->index('lamaran_id');
            $table->index('no_whatsapp');
            $table->index('jenis_notifikasi');
            $table->index('status_kirim');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notifikasi');
    }
};