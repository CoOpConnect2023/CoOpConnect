<?php

namespace Database\Factories;

use App\Models\Message;
use App\Models\User;
use App\Models\Conversation;
use Illuminate\Database\Eloquent\Factories\Factory;

class MessageFactory extends Factory
{
    protected $model = Message::class;

    public function definition()
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'conversation_id' => Conversation::inRandomOrder()->first()->id,
            'content' => $this->faker->sentence,
            'viewed' => false,

        ];
    }
}
