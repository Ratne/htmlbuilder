<?php

namespace App\Http\Livewire;

use Livewire\Component;

class HeadPage extends Component
{
    public $modal;
    public $class = '';

    public function onHead(){
        $this->dispatchBrowserEvent(
            'openModal', 
            ['class' => '.'.$this->modal]
        );
    }

    public function render()
    {
        return view('livewire.head-page');
    }
}
