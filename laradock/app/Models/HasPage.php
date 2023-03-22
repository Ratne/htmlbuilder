<?php

namespace App\Models;

use App\Models\Accessor\Footer;
use App\Models\Accessor\Header;
use App\Models\Accessor\Modal;
use App\Models\Page\Page;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HasPage extends Model
{
    use HasFactory;
    protected $fillable = [
        'page_id',
        'type',
        'object_id'
    ];

    /**
     * Relationships
     */
    public function header(){
        return $this->morphTo(__FUNCTION__,'type','object_id')->where('type',Header::class);
    }

    public function footer(){
        return $this->morphTo(__FUNCTION__,'type','object_id')->where('type',Footer::class);
    }

    public function modal(){
        return $this->morphTo(__FUNCTION__,'type','object_id')->where('type',Modal::class);
    }
    
    public function pages(){
        return $this->hasMany(Page::class,'id','page_id');
    }

    /**
     * Scopes
     */
    public function scopeModals($query){
        return $query->where('type',Modal::class);
    }

    public function scopeHeaders($query){
        return $query->where('type',Header::class);
    }

    public function scopeFooters($query){
        return $query->where('type',Footer::class);
    }

    public function scopeObjectIdIn($query,$ids){
        return $query->whereIn('object_id',$ids);
    }
    
    public function scopeUpdateOrCreateHeader($query,Page $page, $id_header, $forceCreation = false){
        $this->updateOrCreate($page,Header::class,$id_header,forceCreation: $forceCreation);
        return $query;
    }
    
    public function scopeUpdateOrCreateFooter($query,Page $page, $id_footer, $forceCreation = false){
        $this->updateOrCreate($page,Footer::class,$id_footer,forceCreation: $forceCreation);
        return $query;
    }

    public function scopeUpdateOrCreateModal($query,Page $page, $id_modal, $forceCreation = false){
        $this->updateOrCreate($page,Modal::class,$id_modal,forceCreation: $forceCreation);
        return $query;
    }

    private function updateOrCreate(Page $page, $type, $object_id, $isSameObjectId = false, $forceCreation = false){
        $has = self::where('page_id',$page->id)
            ->where('type',$type);

        if(empty($object_id)){
            $has->delete();
            return;
        }
        
        if($isSameObjectId) $has->where('object_id',$object_id);

        $data = [
            'page_id' => $page->id,
            'type' => $type,
            'object_id' => $object_id
        ];

        if($has->count() && !$forceCreation){
            $has->update($data);
            $page->refresh();

            return;
        }
        self::create($data);
        $page->refresh();
    }
}
