<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Jobs;
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
        ];
    }
}
