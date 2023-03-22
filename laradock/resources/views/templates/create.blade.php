@extends('layouts.master')

@section('title')
    {{ __(isset($id) ? 'Edit template' : 'Create template') }}
@endsection

@section('css')
@endsection

@section('content')
    <div class="row">
        <div class="col-12 mb-3">
            <livewire:section-name 
                :modal="'template-name-modal'" />
        </div>
        <div class="col-12">
          <x-builder :content="$content ?? ''" />
        </div> <!-- end col -->
    </div> <!-- end row -->
    <livewire:tools 
        :idSection="$id ?? 0"
        :showroute="'templates.show'"
        :showparam="'template'"
        :type="App\Models\Accessor\Template::class" />

    <livewire:modal.modal-name 
        :idSection="$id ?? 0"
        :title="__('Template name')" 
        :class="'template-name-modal'" />
@endsection
@section('script')
@endsection
