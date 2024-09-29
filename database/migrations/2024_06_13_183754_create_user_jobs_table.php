<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_jobs', function (Blueprint $table) {
            $table->id(); // Add an auto-incrementing primary key
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('jobs_id')->constrained()->onDelete('cascade');
            $table->string("resume")->nullable();
            $table->string("status");
            $table->text("message")->nullable();
            $table->json('time_slots')->nullable();
            $table->date('start_date')->nullable(); // Add start_date
            $table->date('end_date')->nullable();   // Add end_date
            $table->timestamps();

            $table->unique(['user_id', 'jobs_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_jobs');
    }
};
