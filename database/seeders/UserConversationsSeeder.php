<?php

namespace Database\Seeders;

use App\Models\UserConversation;
use Illuminate\Database\Seeder;

class UserConversationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Option 1: Using UserConversationFactory (recommended)
        UserConversation::factory()->count(50)->create();

        // Option 2: Using DB facade (alternative)
        // DB::table('user_conversation')->insert([
        //     [
        //         'user_id' => 1, // Replace with specific user ID
        //         'conversation_id' => 2, // Replace with specific conversation ID
        //     ],
        //     // ... more inserts
        // ]);
    }
}
