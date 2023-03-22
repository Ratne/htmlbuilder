<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_user',
        'notification',
        'is_read'
    ];

    public function getCreatedAtAttribute($value){
        return date('d/m/y H:i',strtotime($value));
    }
}
