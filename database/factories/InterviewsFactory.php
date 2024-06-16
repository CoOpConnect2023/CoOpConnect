<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Interviews;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Interviews>
 */
class InterviewsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Interviews::class;
    public function definition()
    {
        return [
            'interview_date' => $this->faker->dateTimeBetween('now', '+1 month'),
            'duration' => $this->faker->numberBetween(30, 120), // Duration in minutes
            'status' => $this->faker->randomElement(['scheduled', 'completed', 'canceled']),
            'description' => $this->faker->paragraph,
            'interviewee_id' => User::factory(),
            'interviewer_id' => User::factory(),
        ];
    }
}
