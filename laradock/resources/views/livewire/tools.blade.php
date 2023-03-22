<div @if($this->nameToSave) class="emit-init" data-emit-name="onNameAvailable" data-emit-object="0" data-emit-data="{{ $this->nameToSave }}" @endif>
    @if ($type == App\Models\Page\Page::class)
        <x-buttons.fab :id="'preview'" :click="'onPreview()'" :fclass="'fa-eye text-xl'" :class="'mb-5 left-1 bg-transparent fab--muted'" />
    @endif
    <x-buttons.fab :id="'save'" :click="'onSave()'" :fclass="'fa-save text-xl'" :class="'mb-3 bottom-0 left-1 bg-transparent fab--muted'" />
</div>