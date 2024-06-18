<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jobs extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'skills',
        'location',
        'posting_status',
        'job_type',
        'company',
        'user_id',
    ];


    public function setSkillsAttribute($value)
    {
        $this->attributes['skills'] = json_encode($value);
    }

    public function getSkillsAttribute($value)
    {
        return json_decode($value, true);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_jobs', 'jobs_id', 'user_id');
    }

    public function reflections()
    {
        return $this->hasMany(Reflections::class);
    }
}
