<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('school_id')->nullable()->constrained('schools')->onDelete('set null');
            $table->string('profile_image')->nullable();
            $table->boolean('working')->default(false);
            $table->boolean('interviewing')->default(false);
            $table->boolean('searching')->default(false);
            $table->json('skills')->nullable();
            $table->string('positiontitle')->nullable();
            $table->boolean('darkMode')->default(false);
            $table->string('fontSize')->default('small');
            $table->boolean('notifications')->default(true);


            // Add more columns as needed
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['school_id']);
            $table->dropColumn('school_id');
            $table->dropColumn('profile_image');
            $table->dropColumn('working');
            $table->dropColumn('interviewing');
            $table->dropColumn('searching');
            $table->dropColumn('skills');

            // Drop other columns added in 'up' method
        });
    }
};
