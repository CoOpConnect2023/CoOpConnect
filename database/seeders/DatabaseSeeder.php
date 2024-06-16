<?php

namespace Database\Seeders;


// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            UserSeeder::class,
            JobsSeeder::class,
            UserJobsSeeder::class,
            CoursesSeeder::class,
            UserCoursesSeeder::class,
            ReflectionsSeeder::class,
            InterviewsSeeder::class,
        ]);
    }
}
