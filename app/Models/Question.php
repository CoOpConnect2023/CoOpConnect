<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    public function job()
    {
        return $this->belongsTo(Jobs::class);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }
}
