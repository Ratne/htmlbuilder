@extends('layouts.master')

@section('title') Statistiche @endsection

@section('content')

    @component('components.breadcrumb')
        @slot('li_1') Menu @endslot
        @slot('title')
            Statistiche
        @endslot
    @endcomponent

    <div style="margin-bottom: 200px">
    <div class="row" data-id-manager="{{ auth()->user()->id }}">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>
                        Video completati
                    </h4>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <select class="form-control mb-4 select-period">
                                <option value="{{ Carbon\Carbon::today()->format('Y-m-d') }}|{{ Carbon\Carbon::now()->addDay()->format('Y-m-d') }}">Oggi</option>
                                <option value="{{ Carbon\Carbon::today()->subDay()->format('Y-m-d') }}|{{ Carbon\Carbon::today()->subDay()->format('Y-m-d') }}">Ieri</option>
                                <option value="{{ Carbon\Carbon::now()->subDays(8)->format('Y-m-d') }}|{{ Carbon\Carbon::now()->addDay()->format('Y-m-d') }}">Gli ultimi sette giorni</option>
                                <option value="{{ Carbon\Carbon::now()->subDays(31)->format('Y-m-d') }}|{{ Carbon\Carbon::now()->addDay()->format('Y-m-d') }}">Gli ultimi 30 giorni</option>
                                <option value="{{ Carbon\Carbon::now()->subDays(91)->format('Y-m-d') }}|{{ Carbon\Carbon::now()->addDay()->format('Y-m-d') }}">Gli ultimi 90 giorni</option>
                                <option value="-1">Periodo personalizzato</option>
                            </select>
                            <div class="input-daterange input-group mb-4 d-none" id="datepicker11" data-date-format="yyyy-mm-dd"
                                data-date-autoclose="true" data-provide="datepicker" data-date-container='#datepicker11'>
                                <input type="text" class="form-control search-range-date-video-completion-start" value="{{ Carbon\Carbon::today()->format('Y-m-d') }}" name="start" placeholder="Data di inizio" />
                                <input type="text" class="form-control search-range-date-video-completion-end" value="{{ Carbon\Carbon::now()->addDay()->format('Y-m-d') }}" name="end" placeholder="Data di fine" />
                            </div>
                        </div>
                        <div class="col-auto">
                            <button class="btn btn-primary search-range-date-video-completion">
                                Cerca
                            </button>
                        </div>
                    </div>
                    
                    @php
                        $members_today = auth()->user()->membersVideoCompleted;
                    @endphp

                    @if($members_today->count()==0)
                        <h4 class="text-center mb-0">
                            Non ci sono statistiche da visualizzare
                        </h4>
                    @else
                        <table id="datatable" class="table table-bordered dt-responsive  nowrap w-100">
                            <thead>
                                <tr>
                                    <td>Nome</td>
                                    <td>Video completati</td>
                                    <td>Azioni</td>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach(auth()->user()->membersVideoCompleted as $team_member)
                                    @if(count($team_member->user->logsVideoCompleted)>0)
                                        <tr>
                                            <td>
                                                {{ $team_member->user->name }}
                                            </td>
                                            <td>
                                                {{ count($team_member->user->logsVideoCompleted) }}
                                            </td>
                                            <td>
                                                <button class="btn rounded btn-primary" data-user-name="{{ $team_member->user->name }}" data-id-user="{{ $team_member->user->id }}" data-logs="{{ $team_member->user->logsToday }}">
                                                    Visualizza dettagli
                                                </button>
                                            </td>
                                        </tr>
                                    @endif
                                @endforeach
                            </tbody>
                        </table>
                    @endif

                </div>
            </div>
        </div> <!-- end col -->
    </div> <!-- end row -->

    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>
                        Utenti loggati
                    </h4>
                </div>
                <div class="card-body">

                    <div class="row">
                        <div class="col">
                            <select class="form-control mb-4 select-period">
                                <option value="{{ Carbon\Carbon::now()->subDays(7)->format('Y-m-d') }}|{{ Carbon\Carbon::now()->format('Y-m-d') }}">Gli ultimi sette giorni</option>
                                <option value="{{ Carbon\Carbon::now()->subDays(30)->format('Y-m-d') }}|{{ Carbon\Carbon::now()->format('Y-m-d') }}">Gli ultimi 30 giorni</option>
                                <option value="{{ Carbon\Carbon::now()->subDays(90)->format('Y-m-d') }}|{{ Carbon\Carbon::now()->format('Y-m-d') }}">Gli ultimi 90 giorni</option>
                                <option value="-1">Periodo personalizzato</option>
                            </select>
                            <div class="input-daterange input-group mb-4 d-none" id="datepicker9" data-date-format="yyyy-mm-dd"
                                data-date-autoclose="true" data-provide="datepicker" data-date-container='#datepicker9'>
                                <input type="text" class="form-control search-range-date-access-start" name="start" placeholder="Data di inizio" />
                                <input type="text" class="form-control search-range-date-access-end" name="end" placeholder="Data di fine" />
                            </div>
                        </div>
                        <div class="col-auto">
                            <button class="btn btn-primary search-range-date-access">
                                Cerca
                            </button>
                        </div>
                    </div>

                    <h4 class="text-center mb-0 d-none" id="noStatsLogged">
                        Non ci sono statistiche da visualizzare
                    </h4>

                    <table id="datatableLogged" class="table table-bordered dt-responsive  nowrap w-100">
                        <thead>
                            <tr>
                                <td>Nome</td>
                                <td>Accessi</td>
                                <td>Azioni</td>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>

                </div>
            </div>
        </div> <!-- end col -->
    </div> <!-- end row -->


    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>
                        Tempo medio visualizzazione
                    </h4>
                </div>
                <div class="card-body">

                    <div class="row">
                        <div class="col">
                            <select class="form-control mb-4 select-period">
                                <option value="{{ Carbon\Carbon::now()->subDays(7)->format('Y-m-d') }}|{{ Carbon\Carbon::now()->format('Y-m-d') }}">Gli ultimi sette giorni</option>
                                <option value="{{ Carbon\Carbon::now()->subDays(30)->format('Y-m-d') }}|{{ Carbon\Carbon::now()->format('Y-m-d') }}">Gli ultimi 30 giorni</option>
                                <option value="{{ Carbon\Carbon::now()->subDays(90)->format('Y-m-d') }}|{{ Carbon\Carbon::now()->format('Y-m-d') }}">Gli ultimi 90 giorni</option>
                                <option value="-1">Periodo personalizzato</option>
                            </select>
                            <div class="input-daterange input-group mb-4 d-none" id="datepicker8" data-date-format="yyyy-mm-dd"
                                data-date-autoclose="true" data-provide="datepicker" data-date-container='#datepicker8'>
                                <input type="text" class="form-control search-range-date-avg-start" value="{{ Carbon\Carbon::now()->subDays(7)->format('Y-m-d') }}" name="start" placeholder="Data di inizio" />
                                <input type="text" class="form-control search-range-date-avg-end" value="{{ Carbon\Carbon::now()->format('Y-m-d') }}" name="end" placeholder="Data di fine" />
                            </div>
                        </div>
                        <div class="col">
                            <select class="form-control mb-4 member member-avg-playback">
                                <option value="0">Tutti i membri</option>
                                @foreach(auth()->user()->members as $member)
                                    <option value="{{ $member->user->id }}">{{ $member->user->firstname }} {{ $member->user->lastname }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-auto">
                            <button class="btn btn-primary search-range-date-avg">
                                Cerca
                            </button>
                        </div>
                    </div>

                    <h4 class="text-center mb-0 d-none" id="noAvgWatchTime">
                        Non ci sono statistiche da visualizzare
                    </h4>

                    <h4 id="avgWatchTime">
                        La media visualizzazione &egrave; pari a: <span class="avg-time-watch">0</span>
                    </h4>

                    <canvas id="lineChartAvgTimeWatch" height="150"></canvas>

                </div>
            </div>
        </div> <!-- end col -->
    </div> <!-- end row -->


    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>
                        Media video completati
                    </h4>
                </div>
                <div class="card-body">

                    <div class="row">
                        <div class="col">
                            <select class="form-control mb-4 select-period">
                                <option value="{{ Carbon\Carbon::now()->subDays(7)->format('Y-m-d') }}|{{ Carbon\Carbon::now()->format('Y-m-d') }}">Gli ultimi sette giorni</option>
                                <option value="{{ Carbon\Carbon::now()->subDays(30)->format('Y-m-d') }}|{{ Carbon\Carbon::now()->format('Y-m-d') }}">Gli ultimi 30 giorni</option>
                                <option value="{{ Carbon\Carbon::now()->subDays(90)->format('Y-m-d') }}|{{ Carbon\Carbon::now()->format('Y-m-d') }}">Gli ultimi 90 giorni</option>
                                <option value="-1">Periodo personalizzato</option>
                            </select>
                            <div class="input-daterange input-group mb-4 d-none" id="datepicker6" data-date-format="yyyy-mm-dd"
                                data-date-autoclose="true" data-provide="datepicker" data-date-container='#datepicker6'>
                                <input type="text" class="form-control search-range-date-video-completed-start" value="{{ Carbon\Carbon::now()->subDays(7)->format('Y-m-d') }}" name="start" placeholder="Data di inizio" />
                                <input type="text" class="form-control search-range-date-video-completed-end" value="{{ Carbon\Carbon::now()->format('Y-m-d') }}" name="end" placeholder="Data di fine" />
                            </div>
                        </div>
                        <div class="col">
                            <select class="form-control mb-4 member member-avg-completed">
                                <option value="0">Tutti i membri</option>
                                @foreach(auth()->user()->members as $member)
                                    <option value="{{ $member->user->id }}">{{ $member->user->firstname }} {{ $member->user->lastname }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-auto">
                            <button class="btn btn-primary search-range-date-video-completed">
                                Cerca
                            </button>
                        </div>
                    </div>

                    <h4 class="text-center mb-0" id="noAvgVideoCompleted">
                        Non ci sono statistiche da visualizzare
                    </h4>

                    <h4 id="avgVideoCompleted" class="d-none">
                        Media video completati (>= 80%): <span class="avg-video-completed">0</span>% dei video
                    </h4>

                    <canvas id="lineChartAvgCompleted" height="150"></canvas>

                </div>
            </div>
        </div> <!-- end col -->
    </div> <!-- end row -->
    </div>


    <div class="modal fade" id="statModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Statistiche <span class="stats-user-name"></span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col">
                            <select class="form-control mb-4 select-period">
                                <option value="{{ Carbon\Carbon::now()->subDays(7)->format('Y-m-d') }}|{{ Carbon\Carbon::now()->addDay()->format('Y-m-d') }}">Gli ultimi sette giorni</option>
                                <option value="{{ Carbon\Carbon::now()->subDays(30)->format('Y-m-d') }}|{{ Carbon\Carbon::now()->addDay()->format('Y-m-d') }}">Gli ultimi 30 giorni</option>
                                <option value="{{ Carbon\Carbon::now()->subDays(90)->format('Y-m-d') }}|{{ Carbon\Carbon::now()->addDay()->format('Y-m-d') }}">Gli ultimi 90 giorni</option>
                                <option value="-1">Periodo personalizzato</option>
                            </select>
                            <div class="input-daterange input-group mb-4 d-none" id="datepicker7" data-date-format="yyyy-mm-dd"
                                data-date-autoclose="true" data-provide="datepicker" data-date-container='#datepicker7'>
                                <input type="text" class="form-control search-range-date-chart-start" value="{{ Carbon\Carbon::now()->subDays(7)->format('Y-m-d') }}" name="start" placeholder="Data di inizio" />
                                <input type="text" class="form-control search-range-date-chart-end" value="{{ Carbon\Carbon::now()->addDay()->format('Y-m-d') }}" name="end" placeholder="Data di fine" />
                            </div>
                        </div>
                        <div class="col-auto">
                            <button class="btn btn-primary search-range-date-chart">
                                Cerca
                            </button>
                        </div>
                    </div>
                    <canvas id="lineChart" height="150"></canvas>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary rounded" data-dismiss="modal">Chiudi</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="tableModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Statistiche <span class="stats-user-name"></span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table id="datatableModal" class="table table-bordered dt-responsive  nowrap w-100">
                        <thead>
                            <tr>
                                <td>Nome</td>
                                <td>Data</td>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary rounded" data-dismiss="modal">Chiudi</button>
                </div>
            </div>
        </div>
    </div>

@endsection
@section('script')
    <!-- Required datatable js -->
    <script src="{{ URL::asset('/assets/libs/datatables/datatables.min.js') }}"></script>
    <script src="{{ URL::asset('/assets/libs/jszip/jszip.min.js') }}"></script>
    <script src="{{ URL::asset('/assets/libs/pdfmake/pdfmake.min.js') }}"></script>
    <!-- Datatable init js -->
    <script src="{{ URL::asset('/assets/js/pages/datatables.init.js') }}"></script>
    <script src="{{ URL::asset('/assets/libs/dropzone/dropzone.min.js') }}"></script>
    <!--tinymce js-->
    <script src="assets/libs/tinymce/tinymce.min.js"></script>

    <!-- init js -->
    <script src="assets/js/pages/form-editor.init.js"></script>
    <script src="{{ URL::asset('/assets/libs/bootstrap-duration-picker/bootstrap-duration-picker.js') }}"></script>
    <script src="{{ URL::asset('/assets/libs/chart-js/chart-js.min.js') }}"></script>
    <script src="{{ URL::asset('/assets/libs/bootstrap-datepicker/bootstrap-datepicker.min.js') }}"></script>
    <script src="{{ URL::asset('/assets/libs/moment/moment.min.js') }}"></script>
    <script src="{{ URL::asset('/assets/js/pages/manager-stats.js') }}"></script>
@endsection