<form wire:submit.prevent="submit" id="{{ $formid }}" class="remove d-inline-block" method="POST" action="{{ $route }}">
    @csrf
    {{ method_field('DELETE') }}
    <button class="btn rounded btn-danger bg-red-600" type="submit">
        {{ __($title) }}
    </button>
</form>