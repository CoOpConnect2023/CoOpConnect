<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
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
        'status',
        'school_id',
        'class',
        'profile_image',
        'company_id',
        'positiontitle',
        'pronouns',
        'description',
        'working',
        'interviewing',
        'searching',
        'skills',
        'darkMode',
        'fontSize',
        'notifications',

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
        'skills' => 'array',

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
        return $this->belongsToMany(Courses::class, 'user_courses', 'user_id', 'courses_id')->withTimestamps();
    }

    public function teachingCourses()
    {
        return $this->hasMany(Course::class, 'teacher_id');
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
    public function applications()
    {
        return $this->hasMany(Application::class);
    }

public function conversations()
{
    return $this->belongsToMany(Conversation::class);
}


    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function shortlists()
{
    return $this->hasMany(Shortlist::class);
}

public function school()
    {
        return $this->belongsTo(School::class);
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

    public function isAdmin()
{
    return $this->role === 'admin';
}

public function employers()
{
    return $this->belongsToMany(User::class, 'employer_teacher', 'teacher_id', 'employer_id')
                ->withTimestamps();
}

// Many-to-many relationship: an employer can have many teachers
public function teachers()
{
    return $this->belongsToMany(User::class, 'employer_teacher', 'employer_id', 'teacher_id')
                ->withTimestamps();
}

public function company()
{
    return $this->belongsTo(Company::class, 'company_id'); // Assumes the foreign key is 'company_id'
}

public function sharedDocuments()
{
    return $this->belongsToMany(Document::class, 'document_user');
}


public function sharedWithUsers()
{
    return $this->belongsToMany(User::class, 'document_user');
}



}
