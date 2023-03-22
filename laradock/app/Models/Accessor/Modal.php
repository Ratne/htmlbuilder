<?php

namespace App\Models\Accessor;

class Modal extends ParentAccessorModel
{
    /**
     * Scopes
     */
    public function scopeModal($query){
        return $this->scope($query,Modal::class);
    }

    /**
     * Helpers
     */
    public function getAbsolutePath(){
        return $this->getPath(self::MODALS_TYPE,'.html');
    }

    public static function saveOrUpdate($name='',$id=0,$html=''){
        return self::saveUpdate($name,$id,$html,self::MODALS_TYPE,'.html',[],self::class);
    }
}
