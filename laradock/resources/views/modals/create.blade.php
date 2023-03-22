@extends('layouts.master')

@section('title')
    {{ __(isset($id) ? 'Edit modal' : 'Create modal') }}
@endsection

@section('css')
@endsection

@section('content')
    <div class="row">
        <div class="col-12 mb-3">
            <livewire:section-name 
                :modal="'modal-name-modal'" />
        </div>
        <div class="col-12">
          <x-builder :content="$content ?? ''" />
        </div> <!-- end col -->
    </div> <!-- end row -->
    <livewire:tools 
        :idSection="$id ?? 0"
        :showroute="'modals.show'"
        :showparam="'modal'"
        :type="App\Models\Accessor\Modal::class" />

    <livewire:modal.modal-name 
        :idSection="$id ?? 0"
        :title="__('Modal name')" 
        :class="'modal-name-modal'" />
@endsection
@section('script')
@endsection
