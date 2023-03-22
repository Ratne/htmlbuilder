<table id="datatable" class="table table-bordered dt-responsive  nowrap w-100">
    <thead>
        <tr>
            <th class="lg:w-1/4">{{ __('Position') }}</th>
            <th class="lg:w-1/4">{{ __('Slug') }}</th>
            <th class="lg:w-1/4">{{ __('Components') }}</th>
            <th class="lg:w-1/4">{{ __('Actions') }}</th>
        </tr>
    </thead>


    <tbody>
    @foreach ($pages as $index => $page)
        <tr data-id="{{ $page->id }}">
            <td class="lg:w-1/4">
                #{{ $index + 1 }}
            </td>
            <td class="lg:w-1/4">{{ $page->slug }}</td>
            <td class="lg:w-1/4">
                <livewire:page-header-modal-selection :page="$page" />
            </td>
            <td class="lg:w-1/4 text-center">
                <div class="row">
                    <div class="col">
                        <a href="/{{ $page->slug }}" target="_blank" class="btn btn-success bg-green mr-4 w-full">
                            {{ __('View') }}
                        </a>
                    </div>
                    <div class="col">
                        <form class="edit d-inline-block w-full mr-3" method="POST"
                            action="{{ route('pages.update', ['page' => $page->id]) }}">
                            @csrf
                            {{ method_field('PUT') }}
                            <button
                                class="btn rounded w-full btn-{{ $page->isActive ? 'danger' : 'success' }} bg-{{ $page->isActive ? 'red' : 'green' }}-600"
                                type="submit">
                                {{ __($page->isActive ? 'Deactivate' : 'Activate') }}
                            </button>
                        </form>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col pr-1">
                        <form class="edit d-inline-block w-full" method="GET"
                            action="{{ route('pages.show', ['page' => $page->id]) }}">
                            <button class="btn rounded btn-warning bg-yellow-600 w-full" type="submit">
                                {{ __('Edit page') }}
                            </button>
                        </form>
                    </div>
                    <div class="col">
                        <livewire:remove-entity :route="route('pages.destroy', ['page' => $page->id])" :formid="'page-' . $page->id" :title="'Remove page'" />
                    </div>
                </div>
            </td>
        </tr>
    @endforeach
    </tbody>
</table>
