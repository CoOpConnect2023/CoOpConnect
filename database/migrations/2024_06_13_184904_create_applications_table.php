<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateApplicationsTable extends Migration
{
    public function up()
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('job_id')->constrained()->onDelete('cascade');
            $table->timestamps(); // Adds created_at and updated_at columns

            // Ensure a user can only apply to a job once
            $table->unique(['user_id', 'job_id']);

            // Optionally, you can add additional fields specific to your application
            // For example, you might want to include a status column (applied, interviewed, etc.)
        });
    }

    public function down()
    {
        Schema::dropIfExists('applications');
    }
}
