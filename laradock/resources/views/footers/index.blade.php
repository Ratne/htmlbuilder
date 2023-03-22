@extends('layouts.master')

@section('title')
    {{ __('Administer footers') }}
@endsection

@section('css')
@endsection

@section('content')
    <div class="row" @if(session()->has('success')) data-message="{{ session()->get('success') }}" data-type="success" @endif>
        <div class="col-12">
            <div class="card">
                <div class="card-body">

                    <div class="d-flex justify-content-end mb-4">
                        <a class="btn btn-primary" href="{{ route('footers.create') }}">
                            {{ __('Add footer') }}
                        </a>
                    </div>

                    <table id="datatable" class="table table-bordered dt-responsive  nowrap w-100">
                        <thead>
                            <tr>
                                <th class="lg:w-1/4">{{ __('Position') }}</th>
                                <th class="lg:w-1/4">{{ __('Name') }}</th>
                                <th class="lg:w-1/4">{{ __('Actions') }}</th>
                            </tr>
                        </thead>


                        <tbody>

                            @foreach (auth()->user()->footers as $index => $footer)
                                <tr data-id="{{ $footer->id }}">
                                    <td class="lg:w-1/4">
                                        #{{ $index+1 }}
                                    </td>
                                    <td class="lg:w-1/4">{{ $footer->name }}</td>
                                    <td class="lg:w-1/4">
                                        <form class="edit d-inline-block mr-3 mb-2" method="GET" action="{{ route('footers.show',['footer' => $footer->id]) }}">
                                            <button class="btn rounded btn-warning bg-yellow-600" type="submit">
                                                {{ __('Edit footer') }}
                                            </button>
                                        </form>
                                        <livewire:remove-entity 
                                            :route="route('footers.destroy',['footer' => $footer->id])" 
                                            :formid="'footer-'.$footer->id"
                                            :title="'Remove footer'" />
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>

                </div>
            </div>
        </div> <!-- end col -->
    </div> <!-- end row -->

    <livewire:modal.modal-remove 
        :title="__('Are you sure to remove the footer?')"
        :class="'footer-remove-modal'" />
@endsection
@section('script')
@endsection
