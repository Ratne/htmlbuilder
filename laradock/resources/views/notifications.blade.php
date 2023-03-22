@extends('layouts.master')

@section('title')
    Notifiche
@endsection

@section('content')
    @component('components.breadcrumb')
        @slot('li_1')
            Menu
        @endslot
        @slot('title')
            Notifiche
        @endslot
    @endcomponent

    @php
      $notifications = \App\Models\Notification::where('id_user',auth()->user()->id)->orderBy('created_at','desc');
      $notifications->update([
        'is_read' => 1
      ]);
    @endphp

    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">

                    <table id="datatable" class="table table-bordered dt-responsive  nowrap w-100 datatable-notif">
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Notifica</th>
                            </tr>
                        </thead>


                        <tbody>

                            @foreach ($notifications->get() as $notification)
                                <tr>
                                    <td>{{ $notification->created_at }}</td>
                                    <td>{{ $notification->notification }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>

                </div>
            </div>
        </div> <!-- end col -->
    </div> <!-- end row -->
@endsection
@section('script')
    <!-- Required datatable js -->
    <script src="{{ URL::asset('/assets/libs/datatables/datatables.min.js') }}"></script>
    <script src="{{ URL::asset('/assets/libs/jszip/jszip.min.js') }}"></script>
    <script src="{{ URL::asset('/assets/libs/pdfmake/pdfmake.min.js') }}"></script>
    <!-- Datatable init js -->
    <script src="{{ URL::asset('/assets/js/pages/datatables.init.js') }}"></script>
@endsection
