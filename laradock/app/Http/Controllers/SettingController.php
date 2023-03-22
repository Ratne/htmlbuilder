<?php

namespace App\Http\Controllers;

use App\Models\Page\Page;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function store(){
        $data = [
            'settings' => json_encode(request()->all())
        ];
        auth()->user()->saveSettings($data);
        Page::rebuildAllPages();

        return redirect()->back();
    }
}
