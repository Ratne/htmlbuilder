@extends('layouts.master')

@section('title') Preferenze @endsection

@section('css')
    <link href="{{ URL::asset('/assets/libs/select2/select2.min.css') }}" rel="stylesheet" type="text/css" />
@endsection

@section('content')

    @component('components.breadcrumb')
        @slot('li_1') Profilo @endslot
        @slot('title') Preferenze @endslot
    @endcomponent

    @php
      $settings = \App\Models\Setting::where('id_user',auth()->user()->id);
      $settings = $settings->count()>0 ? json_decode($settings->first()->settings) : false;
    @endphp

    <div class="row">
      <div class="col-12">
          <div class="card">
              <div class="card-header">
                <h5>
                  Completamento video
                </h5>
              </div>
              <div class="card-body">
                <form method="post" action="/settings">
                  @csrf
                  <div class="form-check pt-3 pb-3">
                    <input class="form-check-input" type="checkbox" id="formCheck2" name="allow-member-click-to-compete-video" {{ $settings!==false && isset($settings->{'allow-member-click-to-compete-video'}) ? ($settings->{'allow-member-click-to-compete-video'}=='on' ? 'checked' : '') : '' }}>
                    <label class="form-check-label" for="formCheck2">
                        Consenti ai tuoi team member di spuntare il video come completato cliccando sull&apos;apposito pulsante
                    </label>
                  </div>
                  <div class="d-flex justify-content-end">
                    <input type="submit" value="Salva" name="save-complete-video" class="btn btn-success">
                  </div>
                </form>
              </div>
          </div>
      </div>
      <div class="col-12">
        <div class="card">
            <div class="card-header">
              <h5>
                Notifiche
              </h5>
            </div>
            <div class="card-body">
              <form method="post" action="/settings" id="team-member-notif-list-form">
                @csrf
                <input type="hidden" value="{{ $settings!==false && isset($settings->{'team-member-notif-list'}) ? $settings->{'team-member-notif-list'} : '' }}" name="team-member-notif-list">
                <div class="form-check pt-3 pb-3">
                  <input class="form-check-input" type="checkbox" id="formCheck3" name="team-member-notif-all" {{ $settings!==false && isset($settings->{'team-member-notif-all'}) ? ($settings->{'team-member-notif-all'}=='on' ? 'checked' : '') : '' }}>
                  <label class="form-check-label" for="formCheck3">
                    Spunta per attivare le notifiche per tutti i tuoi team member
                  </label>
                </div>

                <div class=" mt-3 {{ $settings!==false && isset($settings->{'team-member-notif-all'}) ? ($settings->{'team-member-notif-all'}=='on' ? 'd-none' : '') : '' }}">
                  <label class="form-label">
                    Seleziona i membri di cui vuoi ricevere le notifiche
                  </label>
                  <select class="form-control select2 ">
                    <option value="" selected disabled>Seleziona l&apos;utente da aggiungere</option>
                    @foreach(auth()->user()->members as $member)
                      <option value="{{ $member->user->id }}">
                        {{ $member->user->name }}
                      </option>
                    @endforeach
                  </select>

                  <div class="mt-3">
                  <table id="datatable" class="table table-bordered dt-responsive  nowrap w-100">
                    <thead>
                      <th>
                        Nome
                      </th>
                      <th>
                        Azioni
                      </th>
                    </thead>
                    <tbody>
                      @foreach(auth()->user()->getMemberToNotif() as $member)
                        <tr>
                          <td>
                            {{ $member->name }}
                          </td>
                          <td>
                            <button class="btn btn-danger remove-user-notif" type="button" data-id="{{ $member->id }}">Rimuovi membro</button>
                          </td>
                        </tr>
                      @endforeach
                    </tbody>
                  </table>
                  </div>
                </div>
                <hr>
                <div class="mt-5">
                  <h5>
                    Completamento video
                  </h5>
                  <div class="form-check pt-3 pb-3 check-with-subselection">
                    <input class="form-check-input" type="checkbox" id="formCheck4" name="team-member-notif-video-completed" {{ $settings!==false && isset($settings->{'team-member-notif-video-completed'}) ? ($settings->{'team-member-notif-video-completed'}=='on' ? 'checked' : '') : '' }}>
                    <label class="form-check-label" for="formCheck4">
                      Ricevi la notifica quando un team member vede un video fino alla fine (almeno 80% di completamento)
                    </label>
                  </div>
                  <div class="form-check pl-4 pt-1 pb-3 {{ $settings!==false && isset($settings->{'team-member-notif-video-completed'}) ? ($settings->{'team-member-notif-video-completed'}=='on' ? '' : 'd-none') : 'd-none' }}">
                    <input class="form-check-input" type="checkbox" id="formCheck5" name="team-member-notif-video-completed-email" {{ $settings!==false && isset($settings->{'team-member-notif-video-completed-email'}) ? ($settings->{'team-member-notif-video-completed-email'}=='on' ? 'checked' : '') : '' }}>
                    <label class="form-check-label" for="formCheck5">
                      Spunta per ricevere la notifica anche via email
                    </label>
                  </div>
                </div>

                <hr>

                <div class="mt-5">
                  <h5>
                    Completamento categoria
                  </h5>
                  <div class="form-check pt-3 pb-3 check-with-subselection">
                    <input class="form-check-input" type="checkbox" id="formCheck6" name="team-member-notif-category-completed" {{ $settings!==false && isset($settings->{'team-member-notif-category-completed'}) ? ($settings->{'team-member-notif-category-completed'}=='on' ? 'checked' : '') : '' }}>
                    <label class="form-check-label" for="formCheck6">
                      Ricevi la notifica quando un team member completa una categoria (almeno 80% di completamento)
                    </label>
                  </div>
                  <div class="form-check pl-4 pt-1 pb-3 {{ $settings!==false && isset($settings->{'team-member-notif-category-completed'}) ? ($settings->{'team-member-notif-category-completed'}=='on' ? '' : 'd-none') : 'd-none' }}">
                    <input class="form-check-input" type="checkbox" id="formCheck7" name="team-member-notif-category-completed-email" {{ $settings!==false && isset($settings->{'team-member-notif-category-completed-email'}) ? ($settings->{'team-member-notif-category-completed-email'}=='on' ? 'checked' : '') : '' }}>
                    <label class="form-check-label" for="formCheck7">
                      Spunta per ricevere la notifica anche via email
                    </label>
                  </div>
                </div>


                <hr>

                <div class="mt-5">
                  <h5>
                    Completamento sottocategoria
                  </h5>
                  <div class="form-check pt-3 pb-3 check-with-subselection">
                    <input class="form-check-input" type="checkbox" id="formCheck8" name="team-member-notif-subcategory-completed" {{ $settings!==false && isset($settings->{'team-member-notif-subcategory-completed'}) ? ($settings->{'team-member-notif-subcategory-completed'}=='on' ? 'checked' : '') : '' }}>
                    <label class="form-check-label" for="formCheck8">
                      Ricevi la notifica quando un team member completa una sottocategoria (almeno 80% di completamento)
                    </label>
                  </div>
                  <div class="form-check pl-4 pt-1 pb-3 {{ $settings!==false && isset($settings->{'team-member-notif-subcategory-completed'}) ? ($settings->{'team-member-notif-subcategory-completed'}=='on' ? '' : 'd-none') : 'd-none' }}">
                    <input class="form-check-input" type="checkbox" id="formCheck9" name="team-member-notif-subcategory-completed-email" {{ $settings!==false && isset($settings->{'team-member-notif-subcategory-completed-email'}) ? ($settings->{'team-member-notif-subcategory-completed-email'}=='on' ? 'checked' : '') : '' }}>
                    <label class="form-check-label" for="formCheck9">
                      Spunta per ricevere la notifica anche via email
                    </label>
                  </div>
                </div>

                <hr>

                <div class="mt-5">
                  <h5>
                    Notifica non visione video
                  </h5>
                  <div class="form-check pt-3 pb-3 check-with-subselection">
                    <input class="form-check-input" type="checkbox" id="formCheck10" name="team-member-notif-no-video-seen" {{ $settings!==false && isset($settings->{'team-member-notif-no-video-seen'}) ? ($settings->{'team-member-notif-no-video-seen'}=='on' ? 'checked' : '') : '' }}>
                    <label class="form-check-label" for="formCheck10">
                      Notificami quando un team member non ha visto video
                    </label>
                  </div>
                  <div class="form-check pl-4 pt-1 pb-3 {{ $settings!==false && isset($settings->{'team-member-notif-no-video-seen'}) ? ($settings->{'team-member-notif-no-video-seen'}=='on' ? '' : 'd-none') : 'd-none' }}">
                    <div class="row">
                      <div class="col">
                        <label>
                          Seleziona il numero di video
                        </label>
                        <select name="team-member-notif-no-video-seen-video-time" class="form-control">
                          @for($i=1;$i<=100;$i++)
                            <option value="{{ $i }}" {{ $settings!==false && isset($settings->{'team-member-notif-no-video-seen-video-time'}) ? ($settings->{'team-member-notif-no-video-seen-video-time'}==$i ? 'selected' : '') : '' }}>
                              {{ $i }} video
                            </option>
                          @endfor
                        </select>
                      </div>
                      <div class="col">
                        <label>&nbsp;</label>
                        <div class="pl-3">
                          <input class="form-check-input" type="checkbox" id="formCheck11" name="team-member-notif-no-video-seen-video-time-period" {{ $settings!==false && isset($settings->{'team-member-notif-no-video-seen-video-time-period'}) ? ($settings->{'team-member-notif-no-video-seen-video-time-period'}=='on' ? 'checked' : '') : '' }}>
                          <label class="form-check-label" for="formCheck11">
                            Seleziona per indicare che i video sono giornalieri
                          </label>
                          <div>
                            <small>
                              <i>
                                Se non spuntato saranno considerati come settimanali
                              </i>
                            </small>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 mt-3">
                        <label>
                          Inserisci l&apos;orario per la notifica
                        </label>
                        <input type="time" class="form-control" name="team-member-notif-no-video-seen-in-day-hour" value="{{ $settings!==false && isset($settings->{'team-member-notif-no-video-seen-in-day-hour'}) ? $settings->{'team-member-notif-no-video-seen-in-day-hour'} : '' }}">
                      </div>
                      <div class="col-12 mt-3">
                        <input class="form-check-input" type="checkbox" id="formCheck12" name="team-member-notif-no-video-seen-email" {{ $settings!==false && isset($settings->{'team-member-notif-no-video-seen-email'}) ? ($settings->{'team-member-notif-no-video-seen-email'}=='on' ? 'checked' : '') : '' }}>
                        <label class="form-check-label" for="formCheck12">
                          Spunta per ricevere la notifica anche via email
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="d-flex justify-content-end mt-3">
                  <input type="submit" class="btn btn-success" value="Salva" name="save-notif">
                </div>
              </form>
            </div>
        </div>
    </div>
    <div class="col-12">
      <div class="card">
          <div class="card-header">
            <h5>
              Reset completamento video membri
            </h5>
          </div>
          <div class="card-body">
            <b>
              <i>
                Resetta i completamenti dei video effettuati dai tuoi membri (questa operazione &egrave; irreversibile)
              </i>
            </b>
            <form method="post" action="/settings" >
              @csrf
              <input type="hidden" name="reset-completion-trigger" value="1">
              <input type="submit" class="btn btn-danger w-100 mt-4" name="reset-completion" value="Resetta">
            </form>
          </div>
      </div>
    </div>
    </div>

@endsection
@section('script')
    <script src="{{ URL::asset('/assets/libs/datatables/datatables.min.js') }}"></script>
    
    <script src="{{ URL::asset('/assets/js/pages/datatables.init.js') }}"></script>
    <script src="{{ URL::asset('/assets/libs/select2/select2.min.js') }}"></script>
    <script src="{{ URL::asset('/assets/js/pages/manager-preferences.js') }}"></script>
@endsection