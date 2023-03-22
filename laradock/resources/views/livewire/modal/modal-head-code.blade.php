<div>
    <x-modal :title="$title" :class="$class">
        <slot>
            <form wire:submit.prevent="submit">
                <textarea class="form-control" wire:model.lazy="headToSave"></textarea>
                <button type="submit" class="btn btn-primary w-full mt-3">
                    {{ __('Save') }}
                </button>
            </form>
        </slot>
    </x-modal>
</div>