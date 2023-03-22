@extends('layouts.master')

@section('title')
    {{ __(isset($id) ? 'Edit category' : 'Create category') }}
@endsection

@section('css')
@endsection

@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                  <h3>
                    {{ __('Type the category name and click on save') }}
                  </h3>
                </div>
                <div class="card-body">
                    <form action="{{ route('categories.store') }}" method="POST">
                        @csrf
                        @if(isset($id))
                          <input type="hidden" name="id" value="{{ $id }}">
                        @endif
                        <input type="text" name="name" value="{{ $name ?? '' }}" class="form-control" placeholder="{{ __('Category name') }}" />
                        <button type="submit" class="btn btn-primary mt-3 w-full">
                            {{ __('Save') }}
                        </button>
                    </form>
                </div>
            </div>
        </div> <!-- end col -->
    </div> <!-- end row -->
@endsection
@section('script')
@endsection
