<?php

namespace App\Models\Accessor;

class Template extends ParentAccessorModel
{
    /**
     * Scopes
     */
    public function scopeTemplate($query){
        return $this->scope($query,Template::class);
    }

    /**
     * Helpers
     */
    public function getAbsolutePath(){
        return $this->getPath(self::TEMPLATES_TYPE,'.html');
    }

    public static function saveOrUpdate($name='',$id=0,$html=''){
        return self::saveUpdate($name,$id,$html,self::TEMPLATES_TYPE,'.html',[],self::class);
    }
}
