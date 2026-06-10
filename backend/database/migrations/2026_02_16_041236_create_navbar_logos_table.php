<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('navbar_logos', function (Blueprint $table) {
            $table->id();

            /**
             * Kita pakai "key" supaya cuma ada 1 record untuk logo.
             * Unique key memastikan tidak ada duplikat.
             */
            $table->string('key')->unique(); // contoh: 'logo'

            /**
             * Path file relatif di storage (misal: navbar/logo/xxx.png)
             */
            $table->string('path');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('navbar_logos');
    }
};