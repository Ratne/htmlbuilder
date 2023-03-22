@extends('layouts.master')

@section('title')
    {{ __(isset($id) ? 'Edit header' : 'Create header') }}
@endsection

@section('css')
@endsection

@section('content')
    <div class="row">
        <div class="col-12 mb-3">
            <livewire:section-name 
                :modal="'header-name-modal'" />
        </div>
        <div class="col-12">
          <x-builder :content="$content ?? ''" />
        </div> <!-- end col -->
    </div> <!-- end row -->
    <livewire:tools 
        :idSection="$id ?? 0"
        :showroute="'headers.show'"
        :showparam="'header'"
        :type="App\Models\Accessor\Header::class" />

    <livewire:modal.modal-name 
        :idSection="$id ?? 0"
        :title="__('Header name')" 
        :class="'header-name-modal'" />
@endsection
@section('script')
@endsection
