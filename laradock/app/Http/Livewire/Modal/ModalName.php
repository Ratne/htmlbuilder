<?php

namespace App\Http\Livewire\Modal;

use App\Models\Page;

class ModalName extends ModalParent
{
    public $idSection;
    public $type;
    public $nameToSave;

    protected $listeners = [
        'emitNameToSave',
        'onNameAvailable',
        'openModal'
    ];
    
    public function onNameAvailable($name){
        $this->nameToSave = $name;
    }

    public function emitNameToSave(){
        if($this->idSection && $this->type==Page::class){
            $this->emitNameToSave();
        }
    }

    public function submit(){
        $this->emitName();
        $this->emit('onSave');
        $this->openCloseModal('closeModal');
    }
    
    public function render()
    {
        return view('livewire.modal.modal-name');
    }

    private function emitName(){
        $this->emit('onNameAvailable',$this->nameToSave);
    }
}
