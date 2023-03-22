<?php

namespace App\Http\Livewire;

use Livewire\Component;

class RemoveEntity extends Component
{
    public $title;
    public $route;
    public $formid;
    public $calledModal = false;

    protected $listeners = [
        'remove'
    ];

    public function mount(string $route, string $title, string $formid){
        $this->title = $title;
        $this->route = $route;
        $this->formid = $formid;
    }

    public function submit(){
        $this->calledModal = true;
        $this->emit('openModal');
    }

    public function remove($isRemove){
        if(!$this->calledModal) return;

        $this->calledModal = false;

        if($isRemove){
            $this->dispatchBrowserEvent(
                'submitForm',
                [
                    'id' => '#'.$this->formid
                ]
            );
        }
    }

    public function render()
    {
        return view('livewire.remove-entity');
    }
}
