<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8" />
    <title> @yield('title') | {{ env('APP_TITLE') }}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="{{ env('META_DESCRIPTION','') }}" name="description" />
    <meta content="{{ App\Helpers\CookieHelper::getUserToken() }}" name="user_token" />
    <!-- App favicon -->
    <link rel="shortcut icon" href="{{ URL::asset('assets/images/favicon.ico') }}">
    @include('layouts.head-css')
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('/assets/libs/toastr/toastr.min.css') }}">
    @livewireStyles
</head>

@section('body')
    <body data-sidebar="dark" class="{{ isset($sidebarClosed) && $sidebarClosed ? 'sidebar-enable vertical-collpsed' : '' }}">
@show
    <!-- Begin page -->
    <div id="layout-wrapper">
        @include('layouts.topbar')
        @include('layouts.sidebar')
        <!-- ============================================================== -->
        <!-- Start right Content here -->
        <!-- ============================================================== -->
        <div class="main-content">
            <div class="page-content {{ isset($sidebarClosed) ? 'pt-3' : '' }}">
                <div class="container-fluid">
                    @yield('content')
                </div>
                <!-- container-fluid -->
            </div>
            <!-- End Page-content -->
            @include('layouts.footer')
        </div>
        <!-- end main content-->
    </div>
    <!-- END layout-wrapper -->

    <!-- Right Sidebar -->
    @include('layouts.right-sidebar')
    <!-- /Right-bar -->

    <!-- JAVASCRIPT -->
    @include('layouts.vendor-scripts')
    <!-- Required datatable js -->
    <script src="{{ URL::asset('/assets/libs/datatables/datatables.min.js') }}"></script>
    <!-- Datatable init js -->
    <script src="{{ URL::asset('/assets/js/pages/datatables.init.js') }}"></script>
    <!-- toastr plugin -->
    <script src="{{ URL::asset('/assets/libs/toastr/toastr.min.js') }}"></script>

    <script src="{{ URL::asset('/assets/js/helpers/events.js') }}?v={{ env('APP_DEBUG')==false ? env('CACHE_BUSTER') : time() }}"></script>
    @livewireScripts
</body>

</html>
