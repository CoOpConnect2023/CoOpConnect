<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interview extends Model
{
    use HasFactory;

    protected $fillable = ['start_time', 'end_time', 'date', 'status', 'description', 'feedback'];

    public function interviewer()
    {
        return $this->belongsTo(User::class, 'interviewer_id');
    }

    public function interviewee()
    {
        return $this->belongsTo(User::class, 'interviewee_id');
    }
}
