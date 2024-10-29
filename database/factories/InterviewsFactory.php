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
        $startDate = $this->faker->dateTimeBetween('-1 month', '+1 month');
        $endDate = (clone $startDate)->modify('+1 hour');
        return [
            'title' => $this->faker->sentence,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'status' => $this->faker->randomElement(['scheduled', 'completed', 'canceled']),
            'description' => $this->faker->paragraph,
            'interviewee_id' => User::factory(),
            'interviewer_id' => User::factory(),
            'proposed_time' => null
        ];
    }
}
