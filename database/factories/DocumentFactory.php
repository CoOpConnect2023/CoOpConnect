<?php

namespace Database\Factories;

use App\Models\Document;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class DocumentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Document::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),                   // Create a new user
            'title' => $this->faker->sentence(),            // Generate a random title
            'path' => $this->faker->filePath(),             // Generate a random file path
            'type' => $this->faker->fileExtension(),        // Generate a random file extension (type)
            'visible' => $this->faker->boolean(),           // Randomly set visibility (true/false)
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
