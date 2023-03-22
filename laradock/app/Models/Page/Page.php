<?php

namespace App\Models\Page;

use App\Models\Category;
use App\Models\HasPage;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Page extends PageHelperStaticModel
{
    use HasFactory;

    const SLUG_TEST = 'preview';
    const ACTIVE = 'active';
    const INACTIVE = 'inactive';

    public static $id_creator = 0;
    protected $fillable = [
        'user_id',
        'slug',
        'name',
        'status',
        'head'
    ];

    /**
     * Relationships
     */
    public function has(){
        return $this->hasMany(HasPage::class,'page_id','id')->with([
            'footer',
            'header',
            'modal'
        ]);
    }

    public function categories(){
        return $this->belongsToMany(Category::class,'page_category');
    }
    
    /**
     * Attributes
     */
    public function getIsActiveAttribute(){
        return $this->status==self::ACTIVE;
    }

    public function getHeaderAttribute(){
        return $this->getAccessor('header');
    }

    public function getFooterAttribute(){
        return $this->getAccessor('footer');
    }

    /**
     * Scopes
     */
    public function scopeActive($query){
        return $query->where('status',self::ACTIVE);
    }

    public function scopeInactive($query){
        return $query->where('status',self::INACTIVE);
    }

    /**
     * Helpers
     */
    public function getAbsolutePath(){
        return $this->getPath(self::PAGES_TYPE,'.blade.php');
    }

    public function rebuildPage(){
        self::$final_path = $this->getAbsolutePath();
        self::composeFinalPageIfExistingFromOriginal($this);
    }
    
    public static function isPage($slug,$avoidStatusCheck=false){
        if($slug==self::SLUG_TEST){
            if(!auth()->check()) return false;
            self::$id_creator = auth()->user()->id;
            return true;
        }
        $page = self::where('slug',$slug);
        if(!$avoidStatusCheck) $page->active();
        if($page->count()) self::$id_creator = $page->first()->user_id;
        return $page->count()>0;
    }

    public static function saveForPreview($html){
        self::createPagePhisically(self::SLUG_TEST,$html,self::PAGES_TYPE);
    }

    public static function saveOrUpdate($name='',$id=0,$html=''){
        $slug = Str::slug($name,'-');

        $page = self::find($id);
        $exists = $page;

        $id = self::saveUpdate($name,$id,$html,self::PAGES_TYPE,'.blade.php',[
            'slug' => $slug
        ]);

        if($exists) self::composeFinalPageIfExistingFromOriginal($page);

        return $id;
    }

    public static function rebuildAllPages(){
        foreach(Page::all() as $page){
            $page->rebuildPage();
        }
    }

    private function getAccessor($type){
        if($this->has){
            foreach($this->has as $item){
                if($item->{$type} && $item->{$type}->id){
                    return $item->{$type}->id;
                }
            }
        }
        return null;
    }
}
