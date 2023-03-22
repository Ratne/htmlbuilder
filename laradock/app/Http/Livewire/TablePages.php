<?php

namespace App\Http\Livewire;

use Livewire\Component;

class TablePages extends Component
{
    protected $listeners = [
        'onPageCategorySelected'
    ];
    public $pages;

    public function mount(){
        $this->pages = auth()->user()->pages;   
    }

    public function onPageCategorySelected($categoryId){
        if(empty($categoryId)){
            $this->pages = auth()->user()->pages;
            return;
        }
        $this->pages = auth()->user()
            ->categories()
            ->categoryId($categoryId)
            ->first()
            ->pages;
    }

    public function render()
    {
        return view('livewire.table-pages');
    }
}
