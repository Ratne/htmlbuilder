<?php

namespace App\Models\Accessor;

class Footer extends ParentAccessorModel
{
    /**
     * Scopes
     */
    public function scopeFooter($query){
        return $this->scope($query,Footer::class);
    }

    /**
     * Helpers
     */
    public function getAbsolutePath(){
        return $this->getPath(self::FOOTERS_TYPE,'.html');
    }

    public static function saveOrUpdate($name='',$id=0,$html=''){
        return self::saveUpdate($name,$id,$html,self::FOOTERS_TYPE,'.html',[],self::class);
    }
}
