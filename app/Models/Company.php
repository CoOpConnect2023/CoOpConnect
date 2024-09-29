<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'address',
        'website',
        'email',
    ];

    /**
     * A company can have many users.
     */
    public function users()
    {
        return $this->hasMany(User::class, 'company_id');
    }
}
