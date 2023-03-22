<?php

namespace App\Http\Livewire;

use Livewire\Component;

class Tools extends Component
{
    public $idSection;
    public $type;
    public $html;
    public $nameToSave;
    public $showroute;
    public $showparam;
    public $isFirstSave = true;
    public $isPreview = false;
    
    protected $listeners = [
        'onNameAvailable',
        'onSave',
        'onHtml'
    ];

    public function mount(string $showroute, string $showparam){
        $this->showparam = $showparam;
        $this->showroute = $showroute;
        if($this->idSection){
            $this->type = $this->type::findOrFail($this->idSection);
            $this->nameToSave = $this->type->name;
            $this->isFirstSave = false;
        }
    }

    public function onNameAvailable($name){
        if($this->nameToSave && $this->nameToSave!=$name && $this->idSection){
            $this->type->removeArtifacts($this->idSection);
        }
        $this->nameToSave = $name;
    }

    public function onHtml($html){
        $this->html = $html;

        if($this->isPreview){
            if(method_exists($this->type,'saveForPreview')){
                $this->type::saveForPreview(
                    $this->html
                );
    
                $this->dispatchBrowserEvent(
                    'openNewTab',
                    [
                        'url' => '/preview'
                    ]
                );
            }
        }else{
            if(!$this->nameToSave){
                $this->isFirstSave = true;
                $this->emit('openModal');
                return;
            }
            
            $this->idSection = $this->type::saveOrUpdate(
                $this->nameToSave,
                $this->idSection,
                $this->html
            );

            if(!$this->idSection){
                $this->nameToSave = null;
                $this->dispatchBrowserEvent(
                    'toast',
                    [
                        'type' => 'error',
                        'message' => __('Already exists something with the same name!')
                    ]
                );
                return;
            }

            /**
             * Rebuilds the page in case an header, footer or modal has been edited
             */
            if(method_exists($this->type,'pages')){
                foreach($this->type::find($this->idSection)->pages()->get() as $item){
                    foreach($item->pages as $page){
                        $page->rebuildPage();
                    }
                }
            }
    
            $this->dispatchBrowserEvent(
                'toast',
                [
                    'type' => 'success',
                    'message' => __('Saved!')
                ]
            );

            if($this->isFirstSave){
                sleep(2);
            
                return redirect(route($this->showroute, [
                    $this->showparam => $this->idSection
                ]));
            }
        }
    }

    public function onPreview(){
        $this->isPreview = true;
        $this->getHtml();
    }

    public function onSave(){
        //$this->isPreview = false;
        $this->getHtml();
    }

    public function render()
    {
        return view('livewire.tools');
    }

    private function getHtml(){
        $this->dispatchBrowserEvent(
            'html'
        );
    }
}
