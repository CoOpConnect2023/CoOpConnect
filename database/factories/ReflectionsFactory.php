<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Jobs;
use App\Models\Reflections;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reflections>
 */
class ReflectionsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Reflections::class;
    public function definition()
    {
        return [
            'content' => $this->faker->paragraph,
            'user_id' => User::factory(),
            'jobs_id' => Jobs::factory(),
        ];
    }
}
