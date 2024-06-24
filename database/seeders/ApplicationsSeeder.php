<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Job;
use App\Models\User;
use App\Models\Application;

class ApplicationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Fetch some jobs and users to create applications
        $jobs = Job::inRandomOrder()->limit(10)->get();
        $users = User::inRandomOrder()->limit(20)->get();

        // Create applications for each job-user combination
        foreach ($jobs as $job) {
            foreach ($users as $user) {
                Application::create([
                    'job_id' => $job->id,
                    'user_id' => $user->id,
                    // Add additional fields if necessary
                ]);
            }
        }
    }
}
