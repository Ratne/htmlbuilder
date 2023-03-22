@extends('layouts.master')

@section('title')
    {{ __('Administer pages') }}
@endsection

@section('css')
@endsection

@section('content')
    <form method="POST" action="{{ route('settings.store') }}" class="row" @if(session()->has('success')) data-message="{{ session()->get('success') }}" data-type="success" @endif>
        @csrf
        <div class="col-12">
            <div class="card">
                <div class="card-body">

                    <h6 class="h6">
                      {{ __('Add head code that will be added on every page created') }}
                    </h6>
                    <textarea class="form-control mt-3" name="head-code">{{ auth()->user()->settings()->first() ? auth()->user()->settings()->first()->headCode : '' }}</textarea>

                </div>
            </div>
        </div> <!-- end col -->

        <div class="col-12">
            <div class="card">
                <div class="card-body">

                    <h6 class="h6">
                      {{ __('Add body code that will be added on every page created right after the opening body tag') }}
                    </h6>
                    <textarea class="form-control mt-3" name="body-open-code">{{ auth()->user()->settings()->first() ? auth()->user()->settings()->first()->bodyOpenCode : '' }}</textarea>
                </div>
            </div>
        </div> <!-- end col -->
        <div class="col-12">
            <div class="card">
                <div class="card-body">

                    <h6 class="h6">
                      {{ __('Add body code that will be added on every page created right before the closing body tag') }}
                    </h6>
                    <textarea class="form-control mt-3" name="body-close-code">{{ auth()->user()->settings()->first() ? auth()->user()->settings()->first()->bodyCloseCode : '' }}</textarea>
                </div>
            </div>
        </div> <!-- end col -->

        <div class="col-12 mt-4">
            <button class="btn btn-primary mt-2 w-100">
                {{ __('Save') }}
            </button>
        </div>
    </form> <!-- end row -->
@endsection
@section('script')
    <script type="module" src="{{ asset('/assets/js/pages/pages-index.js') }}?v={{ env('APP_DEBUG',false) ? time() : env('CACHE_BUSTER',time()) }}"></script>
@endsection
