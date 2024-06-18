<?php

namespace Database\Factories;

use App\Models\Message;
use App\Models\User;
use App\Models\Conversation; // Import User model
use Illuminate\Database\Eloquent\Factories\Factory;

class MessageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Message::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        // Get a random user ID from the users table
        $userIds = User::pluck('id')->toArray();
        $conversationIds = Conversation::pluck('id')->toArray();
        $randomUserId = $this->faker->randomElement($userIds);
        $randomConversationId = $this->faker->randomElement($conversationIds);

        return [
            'conversation_id' => $randomConversationId, // Example conversation_id, adjust as needed
            'user_id' => $randomUserId,
            'body' => $this->faker->paragraph,
        ];
    }
}
