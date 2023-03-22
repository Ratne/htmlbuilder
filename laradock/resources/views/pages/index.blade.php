@extends('layouts.master')

@section('title')
    {{ __('Administer pages') }}
@endsection

@section('css')
@endsection

@section('content')
    <div class="row" @if(session()->has('success')) data-message="{{ session()->get('success') }}" data-type="success" @endif>
        <div class="col-12">
            <div class="card">
                <div class="card-body">

                    <div class="row">
                        <div class="col-6">
                            <livewire:select-category />
                        </div>
                        <div class="col-6 d-flex justify-content-end mb-4">
                            <a class="btn btn-primary" href="{{ route('pages.create') }}">
                                {{ __('Add page') }}
                            </a>
                        </div>
                    </div>

                    <livewire:table-pages />


                </div>
            </div>
        </div> <!-- end col -->
    </div> <!-- end row -->
    <livewire:modal.modal-remove 
        :title="__('Are you sure to remove the page?')"
        :class="'page-remove-modal'" />
@endsection
@section('script')
    <script type="module" src="{{ asset('/assets/js/pages/pages-index.js') }}?v={{ env('APP_DEBUG',false) ? time() : env('CACHE_BUSTER',time()) }}"></script>
@endsection
