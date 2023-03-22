<?php

namespace App\Http\Controllers;

use App\Models\HasPage;
use App\Models\Modal;
use App\Models\Page\Page;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function create(){
        return view('pages.create')
            ->with('sidebarClosed',true);
    }

    public function update(Page $page){
        /**
         * This is called by ajax when on editor the user change selection of the target modal on button
         */
        if(request()->wantsJson()){
            $page->has()->modals()->delete();
            $json = json_decode(request()->getContent());
            foreach($json->modal_ids as $modal_id){
                HasPage::updateOrCreateModal($page,$modal_id,true);
            }
            return response()->json([
                'status' => 200
            ]);
        }
        $page->update([
            'status' => $page->isActive ? Page::INACTIVE : Page::ACTIVE
        ]);

        return redirect()->back()->with('success',__('Page status changed successfully!'));
    }

    public function show(Page $page){
        $path = $page->getAbsolutePath();
        
        return $this->create()
            ->with('id',$page->id)
            ->with('content',file_get_contents(
                $path.Page::ORIGINAL_EXTENSION
            ));
    }

    public function destroy(Page $page){
        /**
         * This is called by ajax when on editor the user makes a button modal remove action
         */
        if(request()->wantsJson()){
            $json = json_decode(request()->getContent());
            $page->has()->modals()->objectIdIn($json->modal_ids)->delete();
            return response()->json([
                'status' => 200
            ]);
        }
        $page->remove();

        return redirect()->back();
    }
}
