<?php

namespace App\Models;

use App\Models\Accessor\Footer;
use App\Models\Accessor\Header;
use App\Models\Accessor\Modal;
use App\Models\Accessor\Template;
use App\Models\Page\Page;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    const ADMIN_TYPE = 'admin';
    const USER_TYPE = 'user';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'dob', 
        'avatar',
        'user_type',
        'firstname',
        'lastname',
        'enabled',
        'slots_total'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Relationships
     */
    public function settings(){
        return $this->hasOne(Setting::class,'id_user','id');
    }

    public function pages(){
        return $this->hasMany(Page::class,'user_id','id')->with('has');
    }

    public function headers(){
        return $this->hasMany(Header::class,'user_id','id')->header();
    }

    public function footers(){
        return $this->hasMany(Footer::class,'user_id','id')->footer();
    }

    public function modals(){
        return $this->hasMany(Modal::class,'user_id','id')->modal();
    }

    public function templates(){
        return $this->hasMany(Template::class,'user_id','id')->template();
    }

    public function categories(){
        return $this->hasMany(Category::class,'user_id','id')->with('pages');
    }

    /**
     * Scopes
     */
    public function scopeAdmins($query){
        return $this->scopedUser($query);
    }

    public function scopeUsers($query){
        return $this->scopedUser($query,self::USER_TYPE);
    }

    /**
     * Attributes
     */
    public function getSettingsAttribute(){
        return $this->settings && $this->settings->count() ? json_decode($this->settings->first()->settings) : false;
    }

    private function scopedUser($query,$type=self::ADMIN_TYPE){
        return $query->where('user_type',$type);
    }

    /**
     * Helpers
     */
    public function saveSettings($data){
        $settings = $this->settings();
        if(!$settings->first()){
            $settings->create($data);
        }else{
            $settings->update($data);
        }
    }

    public function getSettings(){
        return json_decode($this->settings()->first()->settings ?: '[]',true);
    }
}
