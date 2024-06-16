<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\UserCourses;
use App\Models\User;
use App\Models\Courses;

class UserCoursesSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();
        $courses = Courses::all();

        // Enroll users in courses
        foreach ($users as $user) {
            $userCourses = $courses->random(rand(1, 3)); // Each user enrolls in 1 to 3 courses
            foreach ($userCourses as $course) {
                UserCourses::factory()->create([
                    'user_id' => $user->id,
                    'courses_id' => $course->id,
                ]);
            }
        }
    }
}
