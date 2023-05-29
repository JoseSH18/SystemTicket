<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('text_Description', 100);
            $table->unsignedBigInteger('id_Priority');
            $table->unsignedBigInteger('id_Status');
            $table->unsignedBigInteger('id_Agent')->nullable();
            $table->unsignedBigInteger('id_User');
            $table->timestamps();

            $table->foreign('id_Priority')->references('id')->on('priorities');
            $table->foreign('id_Status')->references('id')->on('statuses');
            $table->foreign('id_Agent')->references('id')->on('users');
            $table->foreign('id_User')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
