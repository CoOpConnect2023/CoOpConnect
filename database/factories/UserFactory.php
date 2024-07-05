<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\School;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = User::class;
    public function definition()
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'class' => $this->faker->randomElement(['A', 'B', 'C']),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'role' => $this->faker->randomElement(['student', 'teacher', 'employee']),
            'skills' => $this->faker->randomElements(['JavaScript', 'PHP', 'HTML', 'CSS', 'Python'], $this->faker->numberBetween(1, 4)),
            'status' => $this->faker->randomElement(['searching', 'interviewing', 'working']),
            'school_id' => School::inRandomOrder()->first()->id,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }


    public function admin(): static
    {
        return $this->state(fn(array $attributes) => [
            'name' => 'Admin',
            'email' => 'admin@a.ca',
            'class' => 'A',
            'password' => Hash::make('password'), // You can also use the hash you provided
            'role' => 'admin',
        ]);
    }
}
