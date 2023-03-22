<div>
    <button class="btn btn-primary" @if($class=='disabled') data-bs-toggle="tooltip" data-bs-placement="bottom" title="{{ __('You can add head code after saving the page') }}" @else wire:click="onHead()" @endif>
        {{ __('Add head code') }} 
    </button>
</div>