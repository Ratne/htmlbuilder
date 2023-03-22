<div>
    <div class="row">
        <div class="col-auto mb-2">
            <label>
                {{ __('Header') }}
            </label>
            <select class="form-control" wire:model="idHeader">
                <option value="">{{ __('Select an option') }}</option>
                @foreach(auth()->user()->headers()->get() as $header)
                    <option value="{{ $header->id }}">
                        {{ $header->name }}
                    </option>
                @endforeach
            </select>
        </div>
        <div class="col-auto mb-2">
            <label>
                {{ __('Footer') }}
            </label>
            <select class="form-control" wire:model="idFooter">
                <option value="">{{ __('Select an option') }}</option>
                @foreach(auth()->user()->footers()->get() as $footer)
                    <option value="{{ $footer->id }}">
                        {{ $footer->name }}
                    </option>
                @endforeach
            </select>
        </div>
        <div class="col-auto">
            <label>
                {{ __('Category') }}
            </label>
            <select class="form-control" wire:model="idCategory">
                <option value="">{{ __('Select an option') }}</option>
                @foreach(auth()->user()->categories()->get() as $category)
                    <option value="{{ $category->id }}">
                        {{ $category->name }}
                    </option>
                @endforeach
            </select>
        </div>
    </div>
    {{-- Nothing in the world is as soft and yielding as water. --}}
</div>
