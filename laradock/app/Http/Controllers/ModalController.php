<?php

namespace App\Http\Controllers;

use App\Models\Accessor\Modal;
use Illuminate\Http\Request;

class ModalController extends Controller
{
    /**
     * API related JSON responses
     */
    public function index(){
        return response()->json([
            'status' => 200,
            'content' => auth()->user()->modals
        ]);
    }

    /**
     * Frontend controllers routes
     */
    public function create(){
        return view('modals.create')
            ->with('sidebarClosed',true);
    }

    public function show(Modal $modal){
        $path = $modal->getAbsolutePath();
        
        return $this->create()
            ->with('id',$modal->id)
            ->with('content',file_get_contents(
                $path
            ));
    }

    public function destroy(Modal $modal){
        $modal->remove();

        return redirect()->back();
    }
}
