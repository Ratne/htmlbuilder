<?php

namespace App\Helpers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Cookie as FacadesCookie;

class CookieHelper{

  const TOKEN_NAME = 'browser';
  const COOKIE_NAME = 'user_token';

  public static function getUserToken(){
    if(!auth()->check()){
      FacadesCookie::queue(FacadesCookie::forget(self::COOKIE_NAME));
      return "";
    }
    return request()->cookies->get(self::COOKIE_NAME,'');
  }

  public function generateUserToken(){
    if(!request()->cookies->has(self::COOKIE_NAME) && auth()->check()){
      FacadesCookie::queue(self::COOKIE_NAME,auth()->user()->createToken(self::TOKEN_NAME)->plainTextToken,Carbon::now()->addMonth()->timestamp);
    }
  }
}