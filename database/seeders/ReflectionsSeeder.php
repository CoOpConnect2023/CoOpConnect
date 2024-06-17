<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Reflections;
use App\Models\User;
use App\Models\Jobs;

class ReflectionsSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();
        $jobs = Jobs::all();

        // Create reflections
        foreach ($users as $user) {
            $userJobs = $jobs->random(rand(1, 5)); // Each user writes reflections for 1 to 5 jobs
            foreach ($userJobs as $job) {
                Reflections::factory()->create([
                    'user_id' => $user->id,
                    'jobs_id' => $job->id,
                ]);
            }
        }
    }
}
