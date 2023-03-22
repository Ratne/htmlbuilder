<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLogin extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_user',
        'path'
    ];

    public function getCreatedAtAttribute($value){
        return date('d/m/Y',strtotime($value));
    }
}
