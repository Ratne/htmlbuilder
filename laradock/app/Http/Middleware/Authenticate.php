<?php

namespace App\Http\Middleware;

use App\Models\UserLogin;
use Closure;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Contracts\Auth\Factory as Auth;
use Illuminate\Contracts\Auth\Middleware\AuthenticatesRequests;
use Illuminate\Support\Facades\App;

class Authenticate
{
    /**
     * The authentication factory instance.
     *
     * @var \Illuminate\Contracts\Auth\Factory
     */
    protected $auth;

    /**
     * Create a new middleware instance.
     *
     * @param  \Illuminate\Contracts\Auth\Factory  $auth
     * @return void
     */
    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string[]  ...$guards
     * @return mixed
     *
     * @throws \Illuminate\Auth\AuthenticationException
     */
    public function handle($request, Closure $next, ...$guards)
    {
        $this->authenticate($request, $guards);

        if(auth()->user() && auth()->user()->enabled==0){
            auth()->logout();

            return redirect(route('login'))->withErrors(['not_enabled' => 'Account non abilitato']);
        }

        if(auth()->user() && auth()->user()->user_type=='team_member' && auth()->user()->manager->manager->enabled==0){
            auth()->logout();

            return redirect(route('login'))->withErrors(['not_enabled' => 'La licenza del team manager è scaduta']);
        }

        if(auth()->user() && ($request->is('manager-members') || $request->is('admin-licenses') || $request->is('admin-contents-categories') || $request->is('admin-contents-subcategories') || $request->is('admin-contents')) && auth()->user()->user_type=='team_member'){
            return redirect('/');
        }

        if(auth()->user() && ($request->is('admin-licenses') || $request->is('admin-contents-categories') || $request->is('admin-contents-subcategories') || $request->is('admin-contents')) && auth()->user()->user_type=='team_manager'){
            return redirect('/');
        }

        UserLogin::create([
            'id_user' => auth()->user()->id,
            'path' => session()->has('save_login') ? '/login' : $request->path()
        ]);

        session()->remove('save_login');

        return $next($request);
    }

    /**
     * Determine if the user is logged in to any of the given guards.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  array  $guards
     * @return void
     *
     * @throws \Illuminate\Auth\AuthenticationException
     */
    protected function authenticate($request, array $guards)
    {
        if (empty($guards)) {
            $guards = [null];
        }

        foreach ($guards as $guard) {
            if ($this->auth->guard($guard)->check()) {
                return $this->auth->shouldUse($guard);
            }
        }

        $this->unauthenticated($request, $guards);
    }

    /**
     * Handle an unauthenticated user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  array  $guards
     * @return void
     *
     * @throws \Illuminate\Auth\AuthenticationException
     */
    protected function unauthenticated($request, array $guards)
    {
        throw new AuthenticationException(
            'Unauthenticated.', $guards, $this->redirectTo($request)
        );
    }

    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            return route('login');
        }
    }
}
