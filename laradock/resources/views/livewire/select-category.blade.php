<div>
    {{-- Success is as dangerous as failure. --}}
    <select class="form-control" wire:model="optionSelected">
        <option value="">{{ __('Select a category to filter') }}</option>
        @foreach($this->options as $option)
            <option value="{{ $option->id }}">{{ $option->name }}</option>
        @endforeach
    </select>
</div>
