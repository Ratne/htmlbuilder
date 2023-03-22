<?php

namespace App\Http\Controllers;

use App\Models\Accessor\Header;
use Illuminate\Http\Request;

class HeaderController extends Controller
{
    public function create(){
        return view('headers.create')
            ->with('sidebarClosed',true);
    }

    public function show(Header $header){
        $path = $header->getAbsolutePath();
        
        return $this->create()
            ->with('id',$header->id)
            ->with('content',file_get_contents(
                $path
            ));
    }

    public function destroy(Header $header){
        $header->remove();

        return redirect()->back();
    }
}
