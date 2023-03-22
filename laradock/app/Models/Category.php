<?php

namespace App\Models;

use App\Models\Page\Page;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    public $table = 'categories';
    protected $fillable = [
        'name',
        'user_id'
    ];

    /**
     * Relationship
     */
    public function pages(){
        return $this->belongsToMany(Page::class,'page_category');
    }

    /**
     * Scopes
     */
    public function scopeCategoryId($query,$categoryId){
        return $query->where('id',$categoryId);
    }

    public static function createOrUpdateCategory($data){
        $data = array_merge($data,[
            'user_id' => auth()->user()->id
        ]);
        if(array_key_exists('id',$data)){
            self::find($data['id'])->update($data);
            return;
        }
        self::create($data);
    }
}
