<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reflections extends Model
{
    use HasFactory;

    protected $fillable = [
        'content',
        'user_id',
        'jobs_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function job()
    {
        return $this->belongsTo(Jobs::class);
    }
}
