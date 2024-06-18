<?php

namespace Database\Factories;

use App\Models\UserConversation;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserConversationFactory extends Factory
{
    /**
     * Define the model for the factory.
     *
     * @return string
     */
    public function model()
    {
        return UserConversation::class;
    }

    /**
     * Define the blueprint for the factory.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => User::factory(), // This creates a random user ID
            'conversation_id' => Conversation::factory(), // This creates a random conversation ID
        ];
    }
}
