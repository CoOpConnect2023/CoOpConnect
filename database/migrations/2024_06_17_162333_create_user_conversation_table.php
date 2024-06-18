<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserConversationTable extends Migration
{
    public function up()
    {
        Schema::create('user_conversations', function (Blueprint $table) {
            $table->unsignedBigInteger('conversation_id');
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            // Define foreign keys
            $table->foreign('conversation_id')->references('id')->on('conversations')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            // Define primary key
            $table->primary(['conversation_id', 'user_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_conversations');
    }
}
