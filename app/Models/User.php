<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'school',
        'profile_image',
        'company_name',
        'company',
        'working',
        'interviewing',
        'searching',
        'skills',
        'name',
        'email',
        'password',
        'role'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',

    ];

    /**
     * Define a relationship to documents.
     */
    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    public function jobs()
    {
        return $this->belongsToMany(Jobs::class, 'user_jobs');
    }

    public function courses()
    {
        return $this->belongsToMany(Courses::class, 'user_courses');
    }

    public function reflections()
    {
        return $this->hasMany(Reflections::class);
    }

    public function interviewsAsInterviewee()
    {
        return $this->hasMany(Interviews::class, 'interviewee_id');
    }

    public function interviewsAsInterviewer()
    {
        return $this->hasMany(Interviews::class, 'interviewer_id');
    }

    /**
     * Check if the user has a specific role.
     *
     * @param string $role
     * @return bool
     */
    public function hasRole($role)
    {
        return $this->role === $role;
    }
}
