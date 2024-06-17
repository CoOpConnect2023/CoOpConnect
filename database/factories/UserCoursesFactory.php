<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Courses;
use App\Models\UserCourses;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserCourses>
 */
class UserCoursesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = UserCourses::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'courses_id' => Courses::factory(),
        ];

    }
}
