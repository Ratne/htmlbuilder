<?php

namespace App\Models\Accessor;

class Header extends ParentAccessorModel
{
    /**
     * Scopes
     */
    public function scopeHeader($query){
        return $this->scope($query,Header::class);
    }

    /**
     * Helpers
     */
    public function getAbsolutePath(){
        return $this->getPath(self::HEADERS_TYPE,'.html');
    }

    public static function saveOrUpdate($name='',$id=0,$html=''){
        return self::saveUpdate($name,$id,$html,self::HEADERS_TYPE,'.html',[],self::class);
    }
}
