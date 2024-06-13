<?php

namespace Database\Factories;

use App\Models\Interview;
use Illuminate\Database\Eloquent\Factories\Factory;

class InterviewFactory extends Factory
{
    protected $model = Interview::class;

    public function definition()
    {
        return [
            'interviewer_id' => $this->faker->numberBetween(1, 10), // Assuming user IDs 1 to 10 exist
            'interviewee_id' => $this->faker->numberBetween(1, 10), // Assuming user IDs 1 to 10 exist
            'start_time' => $this->faker->dateTimeBetween('+1 week', '+2 weeks'),
            'end_time' => $this->faker->dateTimeBetween('+2 weeks', '+3 weeks'),
            'date' => $this->faker->date(),
            'status' => $this->faker->boolean(),
            'description' => $this->faker->paragraph,
            'feedback' => $this->faker->paragraph,
        ];
    }
}
