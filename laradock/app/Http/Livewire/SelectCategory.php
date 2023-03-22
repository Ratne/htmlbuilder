<?php

namespace App\Http\Livewire;

use Livewire\Component;

class SelectCategory extends Component
{
    public $optionSelected = '';
    public $options = [];

    public function mount(){
        $this->options = auth()->user()->categories;
    }

    public function updatedOptionSelected(){
        $this->emit('onPageCategorySelected',$this->optionSelected);
    }

    public function render()
    {
        return view('livewire.select-category');
    }
}
