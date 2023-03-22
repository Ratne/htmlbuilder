@extends('layouts.master')

@section('title')
    Amministra membri del team
@endsection

@section('content')
    @component('components.breadcrumb')
        @slot('li_1')
            Menu
        @endslot
        @slot('title')
            Membri team
        @endslot
    @endcomponent

    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">

                    @if(session()->has('message'))
                        <div class="alert alert-danger">
                            {{ session()->get('message') }}
                        </div>
                    @endif

                    <div class="row">
                      <div class="col-6">
                        <b>Slots disponibili: {{ auth()->user()->slots }}</b>
                      </div>
                      <div class="col-6 mb-4 d-flex justify-content-end">
                        <button class="btn btn-primary" title="Hai esaurito gli slot disponibili" data-bs-target="#memberModal" {{ auth()->user()->slots<=0 ? 'data-no-slots=1 data-bs-toggle=tooltip data-bs-placement=top' : 'data-bs-toggle=modal' }} >
                          Aggiungi membro team
                        </button>
                      </div>
                    </div>

                    <table id="datatable" class="table table-bordered dt-responsive  nowrap w-100">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Nome</th>
                                <th>Cognome</th>
                                <th>Email</th>
                                <th>Stato</th>
                                <th>Azioni</th>
                            </tr>
                        </thead>


                        <tbody>

                            @foreach (auth()->user()->members as $team_member)
                                <tr>
                                    <td>{{ $team_member->user->name }}</td>
                                    <td>{{ $team_member->user->firstname }}</td>
                                    <td>{{ $team_member->user->lastname }}</td>
                                    <td>{{ $team_member->user->email }}</td>
                                    <td>{{ $team_member->user->enabled ? 'Attivo' : 'Non attivo' }}</td>
                                    <td>
                                        <button class="btn rounded btn-warning edit-user" 
                                            data-user-id="{{ $team_member->user->id }}"
                                            data-firstname="{{ $team_member->user->firstname }}"
                                            data-lastname="{{ $team_member->user->lastname }}"
                                            data-username="{{ $team_member->user->name }}"
                                            data-type="change-user-password">
                                            Modifica
                                        </button>
                                        <button class="activate-deactivate-member btn rounded btn-{{ $team_member->user->enabled ? 'danger' : 'success' }}"
                                          data-active="{{ $team_member->user->enabled }}"
                                          data-user-id="{{ $team_member->user->id }}">
                                          {{ $team_member->user->enabled ? 'Disattiva' : 'Attiva' }} membro
                                      </button>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>

                </div>
            </div>
        </div> <!-- end col -->
    </div> <!-- end row -->

    <div class="modal fade" id="memberModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"><span class="title-prefix">Aggiungi</span> membro team
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form method="post" action="/manager">
                        @csrf
                        <input type="text" class="form-control rounded mb-2" name="name" placeholder="Username">
                        <input type="text" class="form-control rounded mb-2" name="firstname" placeholder="Nome">
                        <input type="text" class="form-control rounded mb-2" name="lastname" placeholder="Cognome">
                        <input type="email" class="form-control rounded mb-2" name="email" placeholder="Email">
                        <input type="email" class="form-control rounded mb-0" name="repeat_email" placeholder="Ripeti Email">
                        <small class="pb-2 d-inline-block">
                            <i>
                                Attenzione: assicurati di scrivere correttamente la mail perch&egrave; poi non sar&agrave; possibile modificarla in un secondo momento 
                            </i>
                        </small>
                        <div class="input-group auth-pass-inputgroup">
                            <input type="password" class="form-control rounded mb-2" name="password" placeholder="Password">
                            <button class="btn btn-light " type="button" id="password-addon" style="height: 36px"><i class="mdi mdi-eye-outline"></i></button>
                        </div>
                    </form>
                    <button type="button" class="btn btn-success" id="randomizerPasswordAdd">
                        Genera password
                    </button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary rounded" data-dismiss="modal">Chiudi</button>
                    <button type="button" class="btn btn-primary rounded save-new-member">Salva</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="editUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"><span class="title-prefix">Cambia password</span></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form method="post" action="/manager">
              <input type="hidden" name="team-member" value="1">
              <input type="text" class="form-control rounded mb-2" name="name" placeholder="Username">
              <input type="text" class="form-control rounded mb-2" name="firstname" placeholder="Nome">
              <input type="text" class="form-control rounded mb-2" name="lastname" placeholder="Cognome">
              <div class="input-group auth-pass-inputgroup">
                <input type="password" class="form-control rounded mb-2" name="password" placeholder="Password">
                <button class="btn btn-light " type="button" id="password-addon2" style="height: 36px"><i class="mdi mdi-eye-outline"></i></button>
              </div>
            </form>
            <button type="button" class="btn btn-success" id="randomizerPasswordEdit">
                Genera password
            </button>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary rounded" data-dismiss="modal">Chiudi</button>
            <button type="button" class="btn btn-primary rounded save-edit-team-member">Salva</button>
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
    <script src="{{ URL::asset('/assets/js/pages/manager-members.js') }}"></script>
@endsection
