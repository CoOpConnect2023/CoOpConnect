<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Courses;

class CoursesSeeder extends Seeder
{
    public function run()
    {
        Courses::factory()->count(5)->create(); // Creates 10 courses
    }
}
