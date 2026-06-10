<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    private function pinTicketTtlSeconds(): int
    {
        // 15 menit = 900 detik
        return (int) (env('PIN_TICKET_TTL_SECONDS', 900));
    }

    private function loginMaxAttempts(): int
    {
        return (int) (env('LOGIN_MAX_ATTEMPTS', 5));
    }

    private function loginDecaySeconds(): int
    {
        return (int) (env('LOGIN_DECAY_SECONDS', 900)); // 15 menit
    }

    /**
     * TTL access token saat LOGIN (menit)
     * Default: 15 menit
     */
    private function accessTokenTtlMinutesLogin(): int
    {
        return max(1, (int) env('JWT_TTL', 15));
    }

    /**
     * TTL access token saat REFRESH (menit)
     * Default: 15 menit (sama seperti login, lebih aman)
     */
    private function accessTokenTtlMinutesRefresh(): int
    {
        return max(1, (int) env('JWT_REFRESH_ACCESS_TTL', 15));
    }

    private function audit(string $event, array $context = []): void
    {
        $safeContext = array_merge([
            'event' => $event,
            'ip' => request()->ip(),
            'ua' => substr((string) request()->userAgent(), 0, 255),
        ], $context);

        Log::info('[SECURITY_AUDIT]', $safeContext);
    }

    private function tokenMetaFromCurrentToken(): array
    {
        $payload = JWTAuth::parseToken()->getPayload();
        $exp = (int) $payload->get('exp'); // unix timestamp seconds
        $now = time();

        return [
            'exp_unix' => $exp,
            'now_unix' => $now,
            'expires_in_seconds' => max(0, $exp - $now),
        ];
    }

    /**
     * TAHAP 1: Verify PIN 6 Digit
     * - rate limit 3 kali (lock 1 jam)
     * - jika benar, keluarkan tiket register (sekali pakai) berlaku 15 menit
     */
    public function verifyPin(Request $request)
    {
        $key = 'verify-pin:' . $request->ip();

        if (RateLimiter::tooManyAttempts($key, 3)) {
            $this->audit('verify_pin_locked', [
                'available_in_seconds' => RateLimiter::availableIn($key),
            ]);

            return response()->json([
                'message' => 'Terlalu banyak percobaan. Coba lagi nanti.'
            ], 429);
        }

        $validator = Validator::make($request->all(), [
            'pin' => 'required|digits:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $secretPin = (string) env('ADMIN_PIN');

        if (hash_equals($secretPin, (string) $request->pin)) {
            RateLimiter::clear($key);

            $ticketPlain = Str::random(64);
            $ticketHash = hash('sha256', $ticketPlain);
            $cacheKey = "pin-ticket:{$ticketHash}";

            Cache::put($cacheKey, [
                'ip' => $request->ip(),
                'issued_at' => now()->toISOString(),
            ], $this->pinTicketTtlSeconds());

            $this->audit('verify_pin_success', [
                'ticket_hash_prefix' => substr($ticketHash, 0, 12),
                'ttl_seconds' => $this->pinTicketTtlSeconds(),
            ]);

            return response()->json([
                'message' => 'PIN benar. Ini tiket sementara untuk daftar admin (berlaku sebentar).',
                'register_ticket' => $ticketPlain,
                'expires_in_seconds' => $this->pinTicketTtlSeconds(),
            ], 200);
        }

        RateLimiter::hit($key, 3600);

        $this->audit('verify_pin_failed');

        return response()->json([
            'message' => 'PIN salah.'
        ], 401);
    }

    /**
     * TAHAP 2: Register Admin (WAJIB tiket)
     * - tiket sekali pakai
     * - tiket terikat IP
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'register_ticket' => 'required|string|min:20',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $ticketPlain = (string) $request->register_ticket;
        $ticketHash = hash('sha256', $ticketPlain);
        $cacheKey = "pin-ticket:{$ticketHash}";

        $payload = Cache::pull($cacheKey);

        if (!$payload) {
            $this->audit('register_failed_invalid_ticket', [
                'email' => $request->email,
                'ticket_hash_prefix' => substr($ticketHash, 0, 12),
            ]);

            return response()->json([
                'message' => 'Tiket tidak valid atau sudah kedaluwarsa. Ulangi verifikasi PIN.'
            ], 403);
        }

        if (($payload['ip'] ?? null) !== $request->ip()) {
            $this->audit('register_failed_ticket_ip_mismatch', [
                'email' => $request->email,
                'ticket_hash_prefix' => substr($ticketHash, 0, 12),
            ]);

            return response()->json([
                'message' => 'Tiket tidak sah. Ulangi verifikasi PIN.'
            ], 403);
        }

        $user = User::create([
            'name' => (string) $request->name,
            'email' => (string) $request->email,
            'password' => Hash::make((string) $request->password),
            'role' => 'admin',
        ]);

        $this->audit('register_success', [
            'user_id' => $user->id,
            'email' => $user->email,
        ]);

        return response()->json([
            'message' => 'Pendaftaran berhasil. Silakan login untuk mendapatkan token.',
            'user' => $user
        ], 201);
    }

    /**
     * TAHAP 3: Login
     * - rate limit 5x salah -> lock 15 menit
     * - TTL token login: 15 menit (JWT_TTL=15)
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $email = Str::lower((string) $request->email);
        $ip = (string) $request->ip();
        $key = 'login:' . hash('sha256', $email . '|' . $ip);

        if (RateLimiter::tooManyAttempts($key, $this->loginMaxAttempts())) {
            $seconds = RateLimiter::availableIn($key);

            $this->audit('login_locked', [
                'email' => $email,
                'available_in_seconds' => $seconds,
            ]);

            return response()->json([
                'message' => 'Terlalu banyak percobaan login. Coba lagi nanti.'
            ], 429);
        }

        // TTL untuk token yang dibuat via LOGIN (15 menit)
        JWTAuth::factory()->setTTL($this->accessTokenTtlMinutesLogin());

        if (!$token = JWTAuth::attempt(['email' => $email, 'password' => (string) $request->password])) {
            RateLimiter::hit($key, $this->loginDecaySeconds());

            $this->audit('login_failed', [
                'email' => $email,
            ]);

            return response()->json([
                'message' => 'Email atau Password salah!'
            ], 401);
        }

        RateLimiter::clear($key);

        $this->audit('login_success', [
            'email' => $email,
            'user_id' => auth()->id(),
        ]);

        $payload = JWTAuth::setToken($token)->getPayload();
        $exp = (int) $payload->get('exp');
        $now = time();

        return response()->json([
            'message' => 'Login berhasil.',
            'token' => $token,
            'token_type' => 'bearer',
            'ttl_minutes' => $this->accessTokenTtlMinutesLogin(),
            'expires_in_seconds' => max(0, $exp - $now),
        ]);
    }

    /**
     * Admin: Profil
     */
    public function me()
    {
        $user = auth()->user();

        $this->audit('profile_view', [
            'user_id' => $user?->id,
            'email' => $user?->email,
        ]);

        return response()->json($user);
    }

    /**
     * Admin: Info token (cek sisa detik token)
     */
    public function tokenInfo()
    {
        try {
            $meta = $this->tokenMetaFromCurrentToken();

            $user = auth()->user();
            $this->audit('token_info', [
                'user_id' => $user?->id,
                'email' => $user?->email,
                'expires_in_seconds' => $meta['expires_in_seconds'],
            ]);

            return response()->json([
                'message' => 'Info token.',
                'expires_in_seconds' => $meta['expires_in_seconds'],
                'exp_unix' => $meta['exp_unix'],
                'now_unix' => $meta['now_unix'],
            ]);
        } catch (\Exception $e) {
            $this->audit('token_info_failed', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Token tidak valid.'], 401);
        }
    }

    /**
     * Admin: Refresh token
     * - Token baru hasil refresh: 15 menit (JWT_REFRESH_ACCESS_TTL=15)
     */
    public function refresh()
    {
        try {
            // TTL untuk token yang dibuat via REFRESH (15 menit)
            JWTAuth::factory()->setTTL($this->accessTokenTtlMinutesRefresh());

            $newToken = JWTAuth::refresh(JWTAuth::getToken());

            $payload = JWTAuth::setToken($newToken)->getPayload();
            $exp = (int) $payload->get('exp');
            $now = time();

            $user = auth()->user();
            $this->audit('token_refresh_success', [
                'user_id' => $user?->id,
                'email' => $user?->email,
            ]);

            return response()->json([
                'message' => 'Token diperbarui.',
                'token' => $newToken,
                'token_type' => 'bearer',
                'ttl_minutes' => $this->accessTokenTtlMinutesRefresh(),
                'expires_in_seconds' => max(0, $exp - $now),
            ]);
        } catch (\Exception $e) {
            $this->audit('token_refresh_failed', [
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'message' => 'Token tidak valid atau sudah kedaluwarsa. Silakan login lagi.'
            ], 401);
        }
    }

    /**
     * Admin: Logout
     */
    public function logout()
    {
        try {
            $user = auth()->user();

            JWTAuth::invalidate(JWTAuth::getToken());

            $this->audit('logout_success', [
                'user_id' => $user?->id,
                'email' => $user?->email,
            ]);

            return response()->json(['message' => 'Logout berhasil. Token sudah tidak berlaku.']);
        } catch (\Exception $e) {
            $this->audit('logout_failed', [
                'error' => $e->getMessage(),
            ]);

            return response()->json(['message' => 'Gagal logout. Token tidak valid.'], 401);
        }
    }
}