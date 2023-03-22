<?php

namespace App\Http\Middleware;

use App\Helpers\CookieHelper;
use Closure;
use Illuminate\Http\Request;

class CookieMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        (new CookieHelper)->generateUserToken();
        return $next($request);
    }
}
