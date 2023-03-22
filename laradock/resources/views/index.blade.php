@extends('layouts.master')

@section('title') Categorie Video @endsection

@section('content')

    @php
      $has_content = request()->has('id_content') || request()->has('id_subcategory') || request()->has('id_category');
    @endphp

    @component('components.breadcrumb')
        @if($has_content)
          @slot('li_1') Corsi @endslot
          @slot('title')
            @if(request()->has('id_content'))
              @php
                $content = \App\Models\Content::findOrFail(request()->get('id_content'))
              @endphp
              @slot('li_pre_2') {{ $content->subcategory->category->name }} @endslot
              @slot('li_pre_2_link') {{ '/?id_category='.$content->subcategory->id_category }} @endslot
              @slot('li_2') {{ $content->subcategory->name }} @endslot
              @slot('li_2_link') {{ '/?id_subcategory='.$content->subcategory->id }} @endslot
              {{ $content->subcategory->name }}
              @slot('title_li')
                {{ $content->name }}
              @endslot
            @elseif(request()->has('id_subcategory') && request()->get('id_subcategory')!=-1)
              @php
                $subcategory = \App\Models\ContentSubcategory::findOrFail(request()->get('id_subcategory'));
              @endphp
              @slot('li_2') {{ $subcategory->category->name }} @endslot
              @slot('li_2_link') {{ '/?id_category='.$subcategory->id_category }} @endslot
              {{ $subcategory->name }}
            @elseif(request()->has('video_not_seen'))
              @slot('title_li')
                Video non visti
              @endslot
            @elseif(request()->has('id_category'))
              {{ \App\Models\ContentCategory::findOrFail(request()->get('id_category'))->name }}
            @endif
          @endslot
        @else
          @slot('title') Corsi @endslot
        @endif
    @endcomponent

    @if(request()->has('id_content'))
      @component('components.video',[
        'subcategories' => $content->subcategory->category->subcategories
      ])
        @php
          $prev_next_video = $content->getPrevNextVideo();
        @endphp
        @slot('title')
          {{ $content->name }}
        @endslot
        @slot('description')
          {!! $content->description !!}
          <div class="progress animated-progess mb-4">
            <div class="progress-bar" role="progressbar" style="width: {{ $content->getProgress() }}%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        @endslot
        @slot('video')
          <div class="text-center">
            {!! $content->content !!}
          </div>
        @endslot
        @slot('prev_video')
          {{ $prev_next_video['prev'] }}
        @endslot
        @slot('next_video')
          {{ $prev_next_video['next'] }}
        @endslot
      @endcomponent
    @elseif(request()->has('id_subcategory') && request()->get('id_subcategory')!=-1)
      <div class="row">
        <div class="col-lg-4 d-lg-block d-none">
          <div class="mb-lg-0" data-simplebar style="max-height: 500px;">
            @php
              $subb = $subcategory->with('category')->get();
              foreach($subb as $s){
                if($s->category!==null){
                  $sub = $s;
                  break;
                }
              }
            @endphp
            @component('components.sidebar-subcategories',[
              'subcategories' => $subb
            ])
              @slot('subcategory')
                {{ $subcategory->category->name }}
              @endslot
              @slot('subcategorystatus')
                {{ $subcategory->isCompleted(auth()->user()->id) ? 'text-success' : ($subcategory->isSomeSeen(auth()->user()->id) ? 'text-warning' : '') }}
              @endslot
            @endcomponent 
          </div>
        </div>
        <div class="col-lg-8 col-12">
          @foreach(\App\Models\Content::where('id_subcategory',request()->get('id_subcategory'))->where('content','<>','')->whereNotNull('content')->where('is_intro',0)->where('is_intro_courses',0)->where('enabled',1)->orderBy('order','ASC')->get() as $content)
            <a href="/?id_content={{ $content->id }}">
              <div class="card">
                <div class="row no-gutters align-items-center">
                  <div class="col-md-4 ps-4">
                    <img class="card-img img-fluid" src="/{{ $content->thumbnail }}?v={{ time() }}" alt="Card image">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">{{ $content->name }}</h5>
                      @if(strlen($content->description)>5)
                        <div class="card-text text-black">{!! $content->description !!}</div>
                      @endif
                      <p class="card-text"><small class="text-muted">Durata: {{ $content->getDurationInSecondsFormatted() }}</small></p>
                      <div class="progress animated-progess mb-4">
                        <div class="progress-bar" role="progressbar" style="width: {{ $content->getProgress() }}%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          @endforeach
        </div>
        <div class="col-12 d-lg-none d-block">
          <div class="mb-lg-0" data-simplebar style="max-height: 500px;">
            @component('components.sidebar-subcategories',[
              'subcategories' => $subb
            ])
              @slot('subcategory')
                {{ $subcategory->category->name }}
              @endslot
              @slot('subcategorystatus')
                {{ $subcategory->isCompleted(auth()->user()->id) ? 'text-success' : ($subcategory->isSomeSeen(auth()->user()->id) ? 'text-warning' : '') }}
              @endslot
            @endcomponent 
          </div>
        </div>
      </div>
    @elseif(request()->has('video_not_seen'))
      <div class="row">
        <div class="col-lg-4 d-lg-block d-none">
          <div class="mb-lg-0" data-simplebar style="max-height: 500px;">
            @php
              $subb = $subcategory->with('category')->get();
              foreach($subb as $s){
                if($s->category!==null){
                  $sub = $s;
                  break;
                }
              }
            @endphp
            @component('components.sidebar-subcategories',[
              'subcategories' => $subb
            ])
              @slot('subcategory')
                {{ $subcategory->category->name }}
              @endslot
              @slot('subcategorystatus')
                {{ $subcategory->isCompleted(auth()->user()->id) ? 'text-success' : ($subcategory->isSomeSeen(auth()->user()->id) ? 'text-warning' : '') }}
              @endslot
            @endcomponent 
          </div>
        </div>
        <div class="col-lg-8 col-12">
          
        </div>
        <div class="col-12 d-lg-none d-block">
          <div class="mb-lg-0" data-simplebar style="max-height: 500px;">
            @component('components.sidebar-subcategories',[
              'subcategories' => $subb
            ])
              @slot('subcategory')
                {{ $subcategory->category->name }}
              @endslot
              @slot('subcategorystatus')
                {{ $subcategory->isCompleted(auth()->user()->id) ? 'text-success' : ($subcategory->isSomeSeen(auth()->user()->id) ? 'text-warning' : '') }}
              @endslot
            @endcomponent 
          </div>
        </div>
      </div>
    @elseif(request()->has('id_category'))
      @php
        $category = \App\Models\ContentCategory::where('id',request()->get('id_category'))->get()->first();
      @endphp
      @if($category && $category->contentIntro && $category->contentIntro->count()>0)
          @php
            $contentIntro = $category->contentIntro[0];
          @endphp
          @include('components.video-intro',[
            'contentIntro' => $contentIntro
          ])
      @endif

      <div class="row">
        <div class="col-lg-4 d-lg-block d-none">
          <div class="mb-lg-0" data-simplebar style="max-height: 500px;">
            @php
              $categories = \App\Models\ContentCategory::with('subcategories')->orderBy('order','ASC')->get();
            @endphp
            @component('components.sidebar-categories',[
              'categories' => $categories,
              'id_category' => request()->get('id_category')
              ])
            @endcomponent 
          </div>
        </div>

        <div class="col-lg-8 col-12">
          @foreach(\App\Models\ContentSubcategory::with(['content' => function($query){
            $query->where('enabled',1);
          }])->where('id_category',request()->get('id_category'))->orderBy('order','ASC')->get() as $subcategory)
            @if($subcategory->content->count()>0)
              <a href="/?id_subcategory={{ $subcategory->id }}">
                <div class="card">
                  <div class="row no-gutters align-items-center">
                    <div class="col-md-4 ps-4">
                      <img class="card-img img-fluid" src="/{{ $subcategory->image }}?v={{ time() }}" alt="Card image">
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">{{ $subcategory->name }}</h5>
                        @if(strlen($subcategory->description)>5)
                          <div class="card-text text-black">{!! $subcategory->description !!}</div>
                        @endif
                        <p class="card-text"><small class="text-muted">Video: {{ $subcategory->content->count() }}</small></p>
                        <div class="progress animated-progess mb-4">
                          <div class="progress-bar" role="progressbar" style="width: {{ $subcategory->getProgress() }}%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            @endif
          @endforeach
        </div>

        <div class="col-12 d-lg-none">
          <div class="mb-lg-0" data-simplebar style="max-height: 500px;">
            @component('components.sidebar-categories',[
              'categories' => $categories,
              'id_category' => request()->get('id_category')
              ])
            @endcomponent 
          </div>
        </div>
      </div>
    @else
      @foreach(\App\Models\ContentCategory::with('subcategories')->orderBy('order','ASC')->get() as $index => $category)
        @if($category && $category->contentIntroCourses && $category->contentIntroCourses->count()>0)
          @php
            $contentIntro = $category->contentIntroCourses[0];
          @endphp
          @include('components.video-intro',[
            'contentIntro' => $contentIntro
          ])
        @endif
        @if($index==-10)
          <!-- Video non visti -->
          @php
            $video_not_seen = \App\Models\Content::where('enabled',1)->where('is_intro',0)->where('is_intro_courses',0)->count()-\App\Models\ContentPlayback::where('id_user',auth()->user()->id)->count()
          @endphp
          @include('components.video-intro-general',[
            'href' => '/?video_not_seen=1&id_subcategory=-1',
            'name' => 'Video non visti',
            'description' => 'Descrizione',
            'duration' => 'Video: '.($video_not_seen<0 ? 0 : $video_not_seen),
            'thumbnail' => ''
          ])
        @endif
        @if($category->subcategories->count()>0)
          <a href="/?id_category={{ $category->id }}">
            <div class="card">
              <div class="row no-gutters align-items-center">
                  <div class="col-md-4">
                    <img class="card-img img-fluid" src="/{{ $category->image }}?v={{ time() }}" alt="Card image">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">{{ $category->name }}</h5>
                      @if(strlen($category->description)>5)
                        <div class="card-text text-black">{!! $category->description !!}</div>
                      @endif
                      <!-- <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                        additional content.</p> -->
                      @php
                        $video_category_sum = 0;
                      @endphp
                      @foreach($category->content as $c)
                        @php
                          $video_category_sum += $c->contentEnabled->count();
                        @endphp
                      @endforeach
                      <p class="card-text"><small class="text-muted">Video: {{ $video_category_sum }}</small></p>
                      <div class="progress animated-progess mb-4">
                        <div class="progress-bar" role="progressbar" style="width: {{ $category->getProgress() }}%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </a>
        @endif
      @endforeach
    @endif

@endsection
