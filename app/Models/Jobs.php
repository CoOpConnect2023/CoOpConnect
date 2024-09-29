<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jobs extends Model
{
    use HasFactory;

    protected $casts = [
        'skills' => 'array',
    ];

    protected $fillable = [
        'title',
        'description',
        'skills',
        'location',
        'posting_status',
        'job_type',
        'company',
        'user_id',
        'company_id',
        'start_date',
        'end_date',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_jobs', 'jobs_id', 'user_id');
    }

    public function user()
{
    return $this->belongsTo(User::class, 'user_id');
}


    public function reflections()
    {
        return $this->hasMany(Reflections::class);
    }

    public function applications()
{
    return $this->hasMany(Application::class);
}

public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

}
