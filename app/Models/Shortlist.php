<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shortlist extends Model
{
    use HasFactory;

    protected $fillable = ['job_id', 'user_id'];

    public function job()
    {
        return $this->belongsTo(Job::class);
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function applicants()
    {
        return $this->belongsToMany(User::class, 'shortlist_user')->with('documents');;
    }
}
