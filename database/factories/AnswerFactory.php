<?php

namespace Database\Factories;

use App\Models\Answer;
use Illuminate\Database\Eloquent\Factories\Factory;

class AnswerFactory extends Factory
{
    protected $model = Answer::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'question_id' => \App\Models\Question::factory(), // Create associated question
            'answer_text' => $this->faker->sentence(),
            'is_correct' => $this->faker->boolean(20), // 20% chance of being true
        ];
    }
}
