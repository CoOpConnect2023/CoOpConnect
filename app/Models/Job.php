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
        'location',
        // other fields...
    ];

    // If you want to protect against mass-assignment but not specify each field, you can set $guarded instead:
    // protected $guarded = [];
}
