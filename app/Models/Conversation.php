<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;

    protected $fillable = ['send_id','recv_id'];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_conversation', 'conversation_id', 'user_id');
    }

}
