<?php

namespace App\Http\Livewire;

use Livewire\Component;

class SectionName extends Component
{
    public $name;
    public $modal;

    protected $listeners = [
        'onNameAvailable'
    ];

    public function edit(){
        $this->dispatchBrowserEvent(
            'openModal', 
            ['class' => '.'.$this->modal]
        );
    }

    public function onNameAvailable($name){
        $this->name = $name;
    }

    public function render()
    {
        return view('livewire.section-name');
    }
}
