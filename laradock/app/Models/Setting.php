<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_user',
        'settings'
    ];

    /**
     * Attributes
     */
    public function getHeadCodeAttribute(){
        return $this->getSetting('head-code');
    }

    public function getBodyOpenCodeAttribute(){
        return $this->getSetting('body-open-code');
    }

    public function getBodyCloseCodeAttribute(){
        return $this->getSetting('body-close-code');
    }

    /**
     * Helpers
     */

    private function getSetting(string $key){
        if(empty($this->settings)) return '';
        $json = json_decode($this->settings,true);
        if(!array_key_exists($key,$json)) return '';

        return $json[$key];
    }
}
