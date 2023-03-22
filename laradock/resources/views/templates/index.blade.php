@extends('layouts.master')

@section('title')
    {{ __('Administer templates') }}
@endsection

@section('css')
@endsection

@section('content')
    <div class="row" @if(session()->has('success')) data-message="{{ session()->get('success') }}" data-type="success" @endif>
        <div class="col-12">
            <div class="card">
                <div class="card-body">

                    <div class="d-flex justify-content-end mb-4">
                        <a class="btn btn-primary" href="{{ route('templates.create') }}">
                            {{ __('Add template') }}
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

                            @foreach (auth()->user()->templates as $index => $template)
                                <tr data-id="{{ $template->id }}">
                                    <td class="lg:w-1/4">
                                        #{{ $index+1 }}
                                    </td>
                                    <td class="lg:w-1/4">{{ $template->name }}</td>
                                    <td class="lg:w-1/4">
                                        <form class="edit d-inline-block mr-3 mb-2" method="GET" action="{{ route('templates.show',['template' => $template->id]) }}">
                                            <button class="btn rounded btn-warning bg-yellow-600" type="submit">
                                                {{ __('Edit template') }}
                                            </button>
                                        </form>
                                        <livewire:remove-entity 
                                                :route="route('templates.destroy',['template' => $template->id])" 
                                                :formid="'template-'.$template->id"
                                                :title="'Remove template'" />
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
        :title="__('Are you sure to remove the template?')"
        :class="'template-remove-modal'" />
@endsection
@section('script')
@endsection
