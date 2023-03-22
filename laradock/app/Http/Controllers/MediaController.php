<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class MediaController extends Controller
{
    public function index(){
        $id_user = auth()->user()->id;
        $partial_path = 'uploads/'.$id_user;
        $public_path = public_path($partial_path);

        if(!file_exists($public_path)) return response()->json([
            'data' => []
        ]);

        $images_path = scandir($public_path);
        $images = [];

        foreach($images_path as $file){
            if($file=='.' || $file=='..') continue;
            array_push($images,url($partial_path.'/'.$file));
        }

        return response()->json([
            'data' => $images
        ]);
    }

    public function store(){
        $images_urls = [];
        $id_user = PersonalAccessToken::findToken(
            request()->query('user_token')
        )->tokenable->id;
        $partial_path = 'uploads/'.$id_user;
        $images_path = public_path($partial_path);
        if(!file_exists($images_path)){
            mkdir($images_path,0755,true);
        }
        foreach(request()->file('files') as $file){
            $filename = time().'.'.$file->getClientOriginalExtension();
            array_push($images_urls,url($partial_path.'/'.$filename));
            $file->move($images_path,$filename);
        }
        return response()->json([
            'data' => $images_urls
        ]);
    }
}
