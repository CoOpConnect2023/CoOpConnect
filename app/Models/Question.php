<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    // Attributes that are mass assignable
    protected $fillable = ['jobs_id', 'question_text', 'question_type'];

    /**
     * Define a relationship where a question belongs to a job.
     */
    public function job()
    {
        return $this->belongsTo(Job::class);
    }

    /**
     * Define a relationship where a question has many answers.
     */
    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    public function responses()
    {
        return $this->hasMany(Response::class);
    }

    public function questions()
{
    return $this->hasMany(Question::class, 'jobs_id'); // 'jobs_id' is the foreign key in the questions table
}
}
