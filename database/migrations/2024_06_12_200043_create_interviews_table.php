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
        Schema::create('interviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('interviewer_id')->constrained('users');
    $table->foreignId('interviewee_id')->constrained('users');
    $table->dateTime('start_time');
    $table->dateTime('end_time');
    $table->date('date');
    $table->boolean('status')->default(false);
    $table->text('description')->nullable();
    $table->text('feedback')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('interviews');
    }
};
