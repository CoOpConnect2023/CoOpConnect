<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Jobs;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Jobs>
 */
class JobsFactory extends Factory
{
    protected $model = Jobs::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => $this->faker->jobTitle,
            'description' => $this->faker->paragraph,
            'skills' => $this->faker->randomElements(['JavaScript', 'PHP', 'HTML', 'CSS', 'Python'], $this->faker->numberBetween(1, 4)),
            'location' => $this->faker->city,
            'posting_status' => $this->faker->randomElement(['Open', 'Closed']),
            'job_type' => $this->faker->randomElement(['Full-time', 'Part-time', 'Contract']),
            'company' => $this->faker->company,
            'user_id' => User::factory()
        ];
    }
}
