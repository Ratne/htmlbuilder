<?php

namespace App\Http\Livewire;

use App\Models\Page\Page;
use Livewire\Component;

class PageHeaderModalSelection extends Component
{

    public Page $page;
    public $idHeader = 0;
    public $idFooter = 0;
    public $idCategory = 0;

    public function mount(Page $page){
        $this->page = $page;
        $this->idHeader = $page->header ?? 0;
        $this->idFooter = $page->footer ?? 0;
        $this->idCategory = $page->categories()->first()->id ?? 0;
    }

    public function updatedIdHeader($idHeader){
        $this->page->has()->updateOrCreateHeader($this->page,$idHeader);
        $this->page->rebuildPage();
    }

    public function updatedIdFooter($idFooter){
        $this->page->has()->updateOrCreateFooter($this->page,$idFooter);
        $this->page->rebuildPage();
    }

    public function updatedIdCategory($idCategory){
        $this->page->categories()->attach($idCategory);
    }

    public function render()
    {
        return view('livewire.page-header-modal-selection');
    }
}
