<?php

namespace App\Http\Controllers;

use App\Models\Accessor\Template;

class TemplateController extends Controller
{
    public function create(){
        return view('templates.create')
            ->with('sidebarClosed',true);
    }

    public function show(Template $template){
        $path = $template->getAbsolutePath();
        
        return $this->create()
            ->with('id',$template->id)
            ->with('content',file_get_contents(
                $path
            ));
    }

    public function destroy(Template $template){
        $template->remove();

        return redirect()->back();
    }
}
