<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interviews extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'start_date',
        'end_date',
        'status',
        'description',
        'interviewee_id',
        'interviewer_id',
        'proposed_time',
    ];

    public function interviewee()
    {
        return $this->belongsTo(User::class, 'interviewee_id');
    }

    public function interviewer()
    {
        return $this->belongsTo(User::class, 'interviewer_id');
    }
}
