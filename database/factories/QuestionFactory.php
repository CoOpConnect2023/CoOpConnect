<?php

namespace Database\Factories;

use App\Models\Question;
use App\Models\Job; // Import the Job model
use Illuminate\Database\Eloquent\Factories\Factory;

class QuestionFactory extends Factory
{
    protected $model = Question::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'jobs_id' => Job::factory(), // Ensure each question belongs to a job
            'question_text' => $this->faker->sentence(),
            'question_type' => $this->faker->randomElement(['text', 'multipleChoice']),
        ];
    }
}
