@extends('layouts.master')

@section('title')
    {{ __(isset($id) ? 'Edit page' : 'Create page') }}
@endsection

@section('css')
@endsection

@section('content')
    <input type="hidden" value="{{ $id ?? 0 }}" name="page_id" />
    <div class="row">
        <div class="col-4 mb-3 d-flex align-items-center">
            <livewire:section-name 
                :modal="'page-name-modal'" />
        </div>
        <div class="col-4 mb-3 d-flex justify-content-center">
            <livewire:template-selector />
        </div>
        <div class="col-4 mb-3 d-flex justify-content-end">
            <livewire:head-page 
                :class="isset($id) ? '' : 'disabled'"
                :modal="'head-code-modal'"/>
        </div>
        <div class="col-12">
          <x-builder :content="$content ?? ''" />
        </div> <!-- end col -->
    </div> <!-- end row -->
    <livewire:tools 
        :idSection="$id ?? 0"
        :showroute="'pages.show'"
        :showparam="'page'"
        :type="App\Models\Page\Page::class" />

    <livewire:modal.modal-name 
        :idSection="$id ?? 0"
        :title="__('Page name')" 
        :class="'page-name-modal'" />

    <livewire:modal.modal-head-code 
        :idSection="$id ?? 0"
        :title="__('Head code')" 
        :class="'head-code-modal'" />
@endsection
@section('script')
    <script type="module" src="{{ asset('/assets/js/pages/pages-create.js') }}?v={{ env('APP_DEBUG',false) ? time() : env('CACHE_BUSTER',time()) }}"></script>
@endsection
