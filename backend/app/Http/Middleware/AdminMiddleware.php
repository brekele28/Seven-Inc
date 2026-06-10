<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        try {
            // Cek apakah ada gelang ajaib (token) dan apakah masih berlaku
            $user = JWTAuth::parseToken()->authenticate();
            
            // Cek apakah di dalam gelangnya tertulis "admin"
            if ($user && $user->role === 'admin') {
                return $next($request); // Boleh masuk!
            }
        } catch (\Exception $e) {
            // Jika gelang palsu atau sudah hancur (expired)
            return response()->json(['message' => 'Gelang tidak valid atau sudah hancur. Silakan Login lagi!'], 401);
        }

        return response()->json(['message' => 'Kamu bukan Admin! Dilarang masuk!'], 403);
    }
}