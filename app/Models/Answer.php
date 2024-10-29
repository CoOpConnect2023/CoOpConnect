<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    // Attributes that are mass assignable
    protected $fillable = ['question_id', 'answer_text', 'is_correct'];

    /**
     * Define a relationship where an answer belongs to a question.
     */
    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function responses()
    {
        return $this->hasMany(Response::class);
    }
}
