<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Jobs;
use App\Models\Document; // Assuming you have a Document model
use App\Models\UserJobs;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserJobs>
 */
class UserJobsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = UserJobs::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'jobs_id' => Jobs::factory(),
            'document_id' => Document::factory(), // Associate with a document
            'resume' => $this->faker->url,
            'status' => $this->faker->randomElement(['Pending', 'Interview', 'Rejected', 'Hired']),
            'start_date' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'end_date' => $this->faker->optional()->dateTimeBetween('now', '+1 year'),
        ];
    }
}
