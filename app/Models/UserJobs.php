<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserJobs extends Model
{
    use HasFactory;

    protected $table = 'user_jobs';

    protected $casts = [
        'time_slots' => 'array',
    ];

    protected $fillable = [
        'user_id',
        'jobs_id',
        'resume',
        'status',
        'time_slots',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function job()
    {
        return $this->belongsTo(Jobs::class, 'jobs_id');
    }
}
