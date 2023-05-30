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
            $table->string('title', 30);
            $table->string('text_Description', 100);
            $table->unsignedBigInteger('id_Priority');
            $table->unsignedBigInteger('id_Status');
            $table->unsignedBigInteger('id_Agent')->nullable();
            $table->unsignedBigInteger('id_User');
            $table->timestamps();

            $table->foreign('id_Priority')->references('id')->on('priorities')->onDelete('cascade');
            $table->foreign('id_Status')->references('id')->on('statuses')->onDelete('cascade');
            $table->foreign('id_Agent')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('id_User')->references('id')->on('users')->onDelete('cascade');
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
