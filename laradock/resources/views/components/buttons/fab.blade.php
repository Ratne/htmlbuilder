@props(['id' => '','fclass' => 'fa-save text-lg', 'class' => '', 'click' => ''])
<div id="{{ $id }}" wire:click="{{ $click }}" class="{{ $class }} fab pointer d-flex align-items-center justify-content-center cursor-pointer z-20">
    <i class="fa {{ $fclass }} text-white"></i>
</div>