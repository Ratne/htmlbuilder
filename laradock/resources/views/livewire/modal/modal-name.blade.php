<div class="emit-init" data-emit-name="emitNameToSave" data-emit-object="0" data-emit-data="{{ $nameToSave }}">
    <x-modal :title="$title" :class="$class">
        <slot>
            <form wire:submit.prevent="submit">
                <input type="text" wire:model.lazy="nameToSave" class="form-control" />
                <button type="submit" class="btn btn-primary w-full mt-3">
                    {{ __('Save') }}
                </button>
            </form>
        </slot>
    </x-modal>
</div>