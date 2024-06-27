<?php

namespace Database\Factories;

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ConversationFactory extends Factory
{
    protected $model = Conversation::class;

    public function definition()
    {
        return [];
    }

    public function configure()
    {
        return $this->afterCreating(function (Conversation $conversation) {
            $users = User::inRandomOrder()->limit(2)->get();
            $conversation->users()->attach($users);
        });
    }
}
