<?php

namespace App\Http\Livewire\Modal;

class ModalRemove extends ModalParent
{
    public function remove($isRemove){
        $this->emit('remove',$isRemove);
        $this->openCloseModal('closeModal');
    }

    public function render()
    {
        return view('livewire.modal.modal-remove');
    }
}
