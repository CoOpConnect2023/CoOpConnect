<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Interviews;
use App\Models\User;

class InterviewsSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();

        // Create interviews
        foreach ($users as $interviewee) {
            $interviewers = $users->where('id', '!=', $interviewee->id)->random(rand(1, 3)); // Each user has 1 to 3 interviews
            foreach ($interviewers as $interviewer) {
                Interviews::factory()->create([
                    'interviewee_id' => $interviewee->id,
                    'interviewer_id' => $interviewer->id,
                ]);
            }
        }
    }
}
