<?php

namespace App\Http\Livewire\Modal;

use App\Models\Page\Page;
use Livewire\Component;

class ModalHeadCode extends ModalParent
{
    public $idSection;
    public $headToSave;
    public Page $page;

    public function booted(){
        if($this->idSection){
            $this->page = Page::find($this->idSection);
            $this->headToSave = $this->page->head;
        }else{
            $this->notOpenModal = true;
        }
    }

    public function submit(){
        $this->page->update([
            'head' => $this->headToSave
        ]);
        $this->openCloseModal('closeModal');
    }

    public function render()
    {
        return view('livewire.modal.modal-head-code');
    }
}
