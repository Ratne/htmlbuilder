<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function create(){
        return view('categories.create');
    }

    public function store(){
        Category::createOrUpdateCategory(request()->all());

        return redirect(route('categories.index'));
    }

    public function show(Category $category){
        return $this->create()
            ->with('id',$category->id)
            ->with('name',$category->name);
    }

    public function destroy(Category $category){
        $category->pages()->detach();
        $category->delete();

        return redirect()->back();
    }
}
