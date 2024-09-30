<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
class EnsureUserHasRole
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure(Request): (Response|RedirectResponse) $next
     * @param string $role
     * @return Response|RedirectResponse|JsonResponse
     */
    public function handle(Request $request, Closure $next, string $role): Response|RedirectResponse|JsonResponse
    {
        if (!Auth::check()){
            return response()->redirectTo('/');
        }
        return $next($request);
    }
}
