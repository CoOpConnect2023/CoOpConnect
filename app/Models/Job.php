<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    // If you have specific fields that you want to be mass-assignable, you can specify them here:
    protected $fillable = [
        'title',
        'description',
        'skills',
        'location',
        'posting_status',
        'job_type',
        'company',
        'user_id',

        // other fields...
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_jobs', 'jobs_id', 'user_id');
    }

    public function reflections()
    {
        return $this->hasMany(Reflections::class);
    }

    public function applications()
{
    return $this->hasMany(Application::class);
}

    // If you want to protect against mass-assignment but not specify each field, you can set $guarded instead:
    // protected $guarded = [];
}
