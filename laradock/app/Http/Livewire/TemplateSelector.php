<?php

namespace App\Http\Livewire;

use App\Models\Accessor\Template;
use Livewire\Component;

class TemplateSelector extends Component
{
    public $templateSelected;

    public function submit(){
        if(empty($this->templateSelected)) return;
        
        $this->dispatchBrowserEvent(
            'template-selected',
            [
                'template' => file_get_contents(
                    Template::find(
                        $this->templateSelected
                    )
                    ->getAbsolutePath()
                )
            ]
        );

        $this->dispatchBrowserEvent('closeModal',[
            'class' => '.template-selector-modal'
        ]);
    }

    public function render()
    {
        return view('livewire.template-selector');
    }
}
