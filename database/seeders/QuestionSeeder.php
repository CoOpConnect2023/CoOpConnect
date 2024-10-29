<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Jobs;
use App\Models\Question;
use App\Models\Answer;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 5 jobs, each with associated questions and answers
        Jobs::factory()->count(5)->create()->each(function ($job) {
            // For each job, create 3 questions
            Question::factory()->count(3)->create(['jobs_id' => $job->id])->each(function ($question) {
                // For each question, create 3-5 answers
                Answer::factory()->count(rand(3, 5))->create(['question_id' => $question->id]);
            });
        });
    }
}
