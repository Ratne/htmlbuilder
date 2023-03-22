<div>
    {{-- Care about people's approval and you will be their prisoner. --}}

    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target=".template-selector-modal">
        {{ __('Choose template') }}
    </button>

    <x-modal :title="__('Choose the template to add')" :class="'template-selector-modal'">
        <slot>
            <form wire:submit.prevent="submit">
                <select class="form-control" wire:model.defer="templateSelected">
                    <option>{{ __('Select an option') }}</option>
                    @foreach(auth()->user()->templates as $template)
                        <option value="{{ $template->id }}">{{ $template->name }}</option>
                    @endforeach
                </select>
                <button type="submit" class="btn btn-primary w-full mt-3">
                    {{ __('Save') }}
                </button>
            </form>
        </slot>
    </x-modal>
</div>
