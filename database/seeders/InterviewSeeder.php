<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InterviewSeeder extends Seeder
{
    public function run()
    {
        // Create 10 dummy interviews
        Interview::factory()->count(10)->create();
    }
}
