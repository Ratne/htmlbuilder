<?php

namespace App\Http\Controllers;

use App\Models\Accessor\Footer;
use Illuminate\Http\Request;

class FooterController extends Controller
{
    public function create(){
        return view('footers.create')
            ->with('sidebarClosed',true);
    }

    public function show(Footer $footer){
        $path = $footer->getAbsolutePath();
        
        return $this->create()
            ->with('id',$footer->id)
            ->with('content',file_get_contents(
                $path
            ));
    }

    public function destroy(Footer $footer){
        $footer->remove();

        return redirect()->back();
    }
}
