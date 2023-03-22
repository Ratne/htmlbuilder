<div>
    <x-modal :title="$title" :class="$class">
        <slot>
            <div class="row">
                <div class="col">
                    <button wire:click="remove(true)" class="btn btn-success bg-green w-full mt-3">
                        {{ __('Yes') }}
                    </button>
                </div>
                <div class="col">
                    <button wire:click="remove(false)" class="btn btn-danger bg-red w-full mt-3">
                        {{ __('No') }}
                    </button>
                </div>
            </div>
        </slot>
    </x-modal>
</div>