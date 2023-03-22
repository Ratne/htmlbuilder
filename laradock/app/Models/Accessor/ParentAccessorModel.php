<?php

namespace App\Models\Accessor;

use App\Models\HasPage;
use App\Models\ParentModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ParentAccessorModel extends ParentModel
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'name',
        'type'
    ];
    public $table = 'page_accessors';

    /**
     * Relationships
     */
    public function has(){
        return $this->hasMany(HasPage::class,'object_id','id')->where('type',self::class);
    }

    public function pages(){
        return $this->has()->with('pages');
    }
}
