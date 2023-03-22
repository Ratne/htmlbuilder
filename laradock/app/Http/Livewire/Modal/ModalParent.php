<?php

namespace App\Http\Livewire\Modal;

use Livewire\Component;

class ModalParent extends Component
{
    public $title;
    public $class;
    protected $notOpenModal = false;

    protected $listeners = [
        'openModal'
    ];

    public function mount($title, $class){
      $this->title = $title;
      $this->class = $class;
    }

    public function openModal(){
      if($this->notOpenModal) return;
      
      $this->openCloseModal();
    }

    protected function openCloseModal($event = 'openModal'){
      $this->dispatchBrowserEvent(
          $event, 
          ['class' => '.'.$this->class]
      );
  }
}
