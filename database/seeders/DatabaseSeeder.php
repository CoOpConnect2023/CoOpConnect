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
            SchoolSeeder::class,
            CompanySeeder::class,
            UserSeeder::class,
            NotificationSeeder::class,
            JobsSeeder::class,
            UserJobsSeeder::class,
            CoursesSeeder::class,
            UserCoursesSeeder::class,
            ReflectionsSeeder::class,
            InterviewsSeeder::class,
            ConversationSeeder::class,
            MessageSeeder::class,
            DocumentsTableSeeder::class,
            UserDocumentsSeeder::class,
            QuestionSeeder::class,

        ]);
    }
}
