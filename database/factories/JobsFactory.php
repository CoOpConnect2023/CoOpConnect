<?php

namespace Database\Factories;

use App\Models\Jobs;
use Illuminate\Database\Eloquent\Factories\Factory;

class JobsFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Jobs::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $skills = $this->faker->randomElements(['JavaScript', 'PHP', 'HTML', 'CSS', 'Python'], $this->faker->numberBetween(1, 4));

        return [
            'title' => $this->faker->jobTitle,
            'description' => $this->faker->paragraph,
            'location' => $this->faker->city,
            'skills' => $skills, // Assign the array of skills directly
            'posting_status' => true, // Default posting_status set to true
            'job_type' => 'full-time', // Default job_type
            'company' => $this->faker->company,
            'user_id' => function () {
                return \App\Models\User::factory()->create()->id;
            },
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
