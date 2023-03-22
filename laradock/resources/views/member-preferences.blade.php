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
                Notifiche
              </h5>
            </div>
            <div class="card-body">
              <form method="post" action="/settings" id="team-member-notif-list-form">
                @csrf
                <div class="row">
                  <div class="mt-5 col-lg col-12">
                    <h5>
                      Reminder visione video
                    </h5>
                    <div class="form-check pt-3 pb-3 check-with-subselection">
                      <input class="form-check-input" type="checkbox" id="formCheck4" name="team-member-notif-video-reminder" {{ $settings!==false && isset($settings->{'team-member-notif-video-reminder'}) ? ($settings->{'team-member-notif-video-reminder'}=='on' ? 'checked' : '') : '' }}>
                      <label class="form-check-label" for="formCheck4">
                        Ricordami di vedere almeno un video
                      </label>
                    </div>
                    <div class="form-check pl-4 pt-1 pb-3 {{ $settings!==false && isset($settings->{'team-member-notif-video-reminder'}) ? ($settings->{'team-member-notif-video-reminder'}=='on' ? '' : 'd-none') : 'd-none' }}">
                      <div class="row">
                        <div class="col">
                          <label>
                            Seleziona quante volte al giorno
                          </label>
                          <select class="form-control" name="team-member-reminder-in-day">
                            <option value="1" {{ $settings!==false && isset($settings->{'team-member-reminder-in-day'}) ? ($settings->{'team-member-reminder-in-day'}=='1' ? 'selected' : '') : '' }}>
                              1 volta al giorno
                            </option>
                            <option value="2" {{ $settings!==false && isset($settings->{'team-member-reminder-in-day'}) ? ($settings->{'team-member-reminder-in-day'}=='2' ? 'selected' : '') : '' }}>
                              2 volte al giorno
                            </option>
                            <option value="3" {{ $settings!==false && isset($settings->{'team-member-reminder-in-day'}) ? ($settings->{'team-member-reminder-in-day'}=='3' ? 'selected' : '') : '' }}>
                              3 volte al giorno
                            </option>
                          </select>
                        </div>
                        <div class="col add-hour-for-notif-container">
                          <label>
                            Inserisci l&apos;orario per la notifica
                          </label>
                          @if($settings!==false && isset($settings->{'team-member-reminder-in-day-hour'}))
                            @if(is_array($settings->{'team-member-reminder-in-day-hour'}))
                              @foreach($settings->{'team-member-reminder-in-day-hour'} as $dayhour)
                                <input type="time" class="form-control w-lg-50 mb-2" name="team-member-reminder-in-day-hour[]" value="{{ $dayhour }}">
                              @endforeach
                            @else 
                              <input type="time" class="form-control w-lg-50" name="team-member-reminder-in-day-hour[]" value="{{ $settings!==false && isset($settings->{'team-member-reminder-in-day-hour'}) ? $settings->{'team-member-reminder-in-day-hour'} : '' }}">
                            @endif
                          @else
                            <input type="time" class="form-control w-lg-50" name="team-member-reminder-in-day-hour[]" value="">
                          @endif
                        </div>
                        <div class="col-12 mt-3">
                          <input class="form-check-input" type="checkbox" id="formCheck5" name="team-member-video-reminder-email" {{ $settings!==false && isset($settings->{'team-member-video-reminder-email'}) ? ($settings->{'team-member-video-reminder-email'}=='on' ? 'checked' : '') : '' }}>
                          <label class="form-check-label" for="formCheck5">
                            Spunta per ricevere la notifica anche via email
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div class="mt-5 col-lg col-12 border-start">
                    <h5>
                      Notifica non visione video
                    </h5>
                    <div class="form-check pt-3 pb-3 check-with-subselection">
                      <input class="form-check-input" type="checkbox" id="formCheck6" name="team-member-notif-no-video-seen" {{ $settings!==false && isset($settings->{'team-member-notif-no-video-seen'}) ? ($settings->{'team-member-notif-no-video-seen'}=='on' ? 'checked' : '') : '' }}>
                      <label class="form-check-label" for="formCheck6">
                        Notificami quando non ho visto video
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
                            <input class="form-check-input" type="checkbox" id="formCheck7" name="team-member-notif-no-video-seen-video-time-period" {{ $settings!==false && isset($settings->{'team-member-notif-no-video-seen-video-time-period'}) ? ($settings->{'team-member-notif-no-video-seen-video-time-period'}=='on' ? 'checked' : '') : '' }}>
                            <label class="form-check-label" for="formCheck7">
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
                          <input type="time" class="form-control w-lg-25" name="team-member-notif-no-video-seen-in-day-hour" value="{{ $settings!==false && isset($settings->{'team-member-notif-no-video-seen-in-day-hour'}) ? $settings->{'team-member-notif-no-video-seen-in-day-hour'} : '' }}">
                        </div>
                        <div class="col-12 mt-3">
                          <input class="form-check-input" type="checkbox" id="formCheck8" name="team-member-notif-no-video-seen-email" {{ $settings!==false && isset($settings->{'team-member-notif-no-video-seen-email'}) ? ($settings->{'team-member-notif-no-video-seen-email'}=='on' ? 'checked' : '') : '' }}>
                          <label class="form-check-label" for="formCheck8">
                            Spunta per ricevere la notifica anche via email
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="d-flex justify-content-end mt-3">
                  <input type="submit" class="btn btn-success" value="Salva" name="save-notif-member">
                </div>
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
    <script src="{{ URL::asset('/assets/js/pages/member-preferences.js') }}"></script>
@endsection