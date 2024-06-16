<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Jobs;

class JobsSeeder extends Seeder
{
    public function run()
    {
        Jobs::factory()->count(20)->create(); // Creates 20 jobs
    }
}
