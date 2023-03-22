@extends('layouts.master')

@section('title')
    {{ __(isset($id) ? 'Edit footer' : 'Create footer') }}
@endsection

@section('css')
@endsection

@section('content')
    <div class="row">
        <div class="col-12 mb-3">
            <livewire:section-name 
                :modal="'footer-name-modal'" />
        </div>
        <div class="col-12">
          <x-builder :content="$content ?? ''" />
        </div> <!-- end col -->
    </div> <!-- end row -->
    <livewire:tools 
        :idSection="$id ?? 0"
        :showroute="'footers.show'"
        :showparam="'footer'"
        :type="App\Models\Accessor\Footer::class" />

    <livewire:modal.modal-name 
        :idSection="$id ?? 0"
        :title="__('Footer name')" 
        :class="'footer-name-modal'" />
@endsection
@section('script')
@endsection
