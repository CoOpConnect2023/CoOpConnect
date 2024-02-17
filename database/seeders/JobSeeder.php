<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
{
    \App\Models\Job::create([
        'title' => 'Software Developer',
        'description' => 'Develop amazing applications.',
        'location' => 'Remote',
        // ... other fields ...
    ]);
    // Add more jobs as needed
}
}

