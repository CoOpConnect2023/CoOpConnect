<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\UserJobs;
use App\Models\User;
use App\Models\Jobs;

class UserJobsSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();
        $jobs = Jobs::all();

        // Assign jobs to users
        foreach ($users as $user) {
            $userJobs = $jobs->random(rand(1, 5)); // Each user applies to 1 to 5 jobs
            foreach ($userJobs as $job) {
                UserJobs::factory()->create([
                    'user_id' => $user->id,
                    'jobs_id' => $job->id,
                ]);
            }
        }
    }
}
