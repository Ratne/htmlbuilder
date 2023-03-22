<?php

namespace App\Models;

use App\Models\Accessor\Footer;
use App\Models\Accessor\Header;
use App\Models\Page\Page;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParentModel extends Model
{
    use HasFactory;

    const ORIGINAL_EXTENSION = '.orig';
    const PAGES_TYPE = 'pages';
    const HEADERS_TYPE = 'headers';
    const FOOTERS_TYPE = 'footers';
    const MODALS_TYPE = 'modals';
    const TEMPLATES_TYPE = 'templates';
    public static $final_path = '';

    /**
     * Scopes
     */
    protected function scope($query,$type){
        return $query->where('type',$type);
    }

    /**
     * Helpers
     */
    public function removeArtifacts(){
        try{
            unlink(
                $this->getAbsolutePath()
            );
            unlink(
                $this->getAbsolutePath().self::ORIGINAL_EXTENSION
            );
        }catch(Exception $e){}
    }

    public function remove(){
        $id_pages = [];
        $hasPages = method_exists($this,'pages');
        if($hasPages){
            foreach($this->pages as $item){
                foreach($item->pages as $page){
                    $id_pages[] = $page->id;
                }
            }
        }
        
        $this->removeArtifacts();

        if($hasPages){
            $this->has()->delete();
        }else{
            $this->categories()->detach();
        }
        
        $this->delete();

        foreach($id_pages as $id_page){
            Page::find($id_page)->rebuildPage();
        }
    }

    protected function getPath($type,$fileExtension){
        return resource_path('views'.DIRECTORY_SEPARATOR.$type.DIRECTORY_SEPARATOR.'user-created-'.$type.DIRECTORY_SEPARATOR.$this->user_id.DIRECTORY_SEPARATOR.($this->slug ?? $this->name).$fileExtension);
    }

    protected static function saveUpdate($name='',$id=0,$html='',$type='',$fileExtension='',$fields=[],$class=''){
        $accessor = self::find($id);
        if(in_array($class,[
            Header::class,
            Footer::class
        ])){
            if(self::where('name',$name)->whereNot('id',$id)->count()){
                return 0;
            }
        }
        $data = array_merge(
            [
                'name' => $name,
                'type' => $class
            ],
            $fields
        );
        if(!$accessor){
            $accessor = self::create(
                array_merge(
                    $data,
                    [
                        'user_id' => auth()->user()->id
                    ]
                )
            );
        }else $accessor->update($data);

        self::createPagePhisically(isset($fields['slug']) && !empty($fields['slug']) ? $fields['slug'] : $name,$html,$type,$fileExtension);

        return $accessor->id;
    }

    protected static function createPagePhisically($name='',$html='',$type='',$fileExtension='.blade.php'){
        if(empty($html) || empty($name)) return;

        $user_pages_path = 'views'.DIRECTORY_SEPARATOR.$type.DIRECTORY_SEPARATOR.'user-created-'.$type;
        $users_pages_folder = resource_path($user_pages_path);

        if(!file_exists($users_pages_folder)){
            mkdir($users_pages_folder,0775);
        }

        $user_folder = resource_path($user_pages_path.DIRECTORY_SEPARATOR.auth()->user()->id);

        if(!file_exists($user_folder)){
            mkdir($user_folder,0775);
        }

        self::$final_path = $user_folder.DIRECTORY_SEPARATOR.$name.$fileExtension;
        file_put_contents(self::$final_path,$html);

        if($type==self::PAGES_TYPE && $name!=Page::SLUG_TEST) self::createMasterPage(self::$final_path);
    }

    private static function createMasterPage($path){
        copy($path,$path.self::ORIGINAL_EXTENSION);
    }
}
