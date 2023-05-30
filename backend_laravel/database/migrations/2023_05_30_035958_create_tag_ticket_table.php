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
        Schema::create('tag_ticket', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_Ticket');
            $table->unsignedBigInteger('id_Tag');
            $table->timestamps();

            $table->foreign('id_Ticket')->references('id')->on('tickets')->onDelete('cascade');
            $table->foreign('id_Tag')->references('id')->on('tags')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tag_ticket');
    }
};
