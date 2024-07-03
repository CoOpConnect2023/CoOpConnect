<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShortlistsTable extends Migration
{
    public function up()
    {
        Schema::create('shortlists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // The user who owns the shortlist
            $table->timestamps();
        });

        Schema::create('shortlist_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shortlist_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // The applicants on the shortlist
            $table->timestamps();


            $table->unique(['shortlist_id', 'user_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('shortlist_user');
        Schema::dropIfExists('shortlists');
    }
}
