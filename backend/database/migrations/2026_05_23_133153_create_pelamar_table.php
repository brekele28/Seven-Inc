<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pelamar', function (Blueprint $table) {
            $table->id();
            $table->string('kode_pelamar', 50)->unique();
            $table->string('nama_lengkap', 150);
            $table->string('email', 150);
            $table->string('no_whatsapp', 30);
            $table->string('jenis_kelamin', 30);
            $table->string('tempat_lahir', 150);
            $table->date('tanggal_lahir');
            $table->text('alamat');
            $table->timestamps();

            $table->index('email');
            $table->index('no_whatsapp');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pelamar');
    }
};