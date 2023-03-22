<div>
    @if($name)
        {{ __('You\'re modifying') }} <b class="cursor-pointer">
            <u wire:click="edit()">
                {{ $name }}
            </u>
        </b>
    @endif
</div>