<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsToJobsTable extends Migration
{
    public function up()
    {
        Schema::table('jobs', function (Blueprint $table) {

            $table->json('skills')->nullable(); // JSON column for skills (array)

            $table->foreignId('user_id')->constrained()->onDelete('cascade');
             // Adds created_at and updated_at columns
        });
    }

    public function down()
    {
        Schema::table('jobs', function (Blueprint $table) {
            $table->dropColumn('title');
            $table->dropColumn('description');
            $table->dropColumn('skills');
            $table->dropColumn('locations');
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
            $table->dropTimestamps();
        });
    }
}
