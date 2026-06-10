<?php

namespace App\Services\Whatsapp;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FonnteService
{
    public function sendMessage(string $target, string $message): array
    {
        if (!config('fonnte.enabled')) {
            return [
                'success' => false,
                'status' => 'disabled',
                'message' => 'Fonnte sedang nonaktif.',
                'raw' => null,
            ];
        }

        $token = config('fonnte.token');

        if (!$token) {
            return [
                'success' => false,
                'status' => 'missing_token',
                'message' => 'Token Fonnte belum dikonfigurasi.',
                'raw' => null,
            ];
        }

        try {
            $response = Http::asForm()
                ->withHeaders([
                    'Authorization' => $token,
                ])
                ->timeout(30)
                ->post(rtrim(config('fonnte.base_url'), '/') . '/send', [
                    'target' => $this->normalizePhone($target),
                    'message' => $message,
                    'countryCode' => config('fonnte.country_code', '62'),
                    'connectOnly' => config('fonnte.connect_only', true),
                    'typing' => true,
                ]);

            $json = $response->json();

            return [
                'success' => $response->successful() && (bool) data_get($json, 'status', false),
                'status' => $response->successful() ? 'sent' : 'failed',
                'message' => data_get($json, 'reason') ?: data_get($json, 'message') ?: 'Request Fonnte selesai.',
                'raw' => $json ?: [
                    'http_status' => $response->status(),
                    'body' => $response->body(),
                ],
            ];
        } catch (\Throwable $e) {
            Log::error('[FONNTE_SEND_FAILED]', [
                'target' => $target,
                'error' => $e->getMessage(),
            ]);

            return [
                'success' => false,
                'status' => 'error',
                'message' => $e->getMessage(),
                'raw' => null,
            ];
        }
    }

    private function normalizePhone(string $phone): string
    {
        $value = preg_replace('/[^\d+]/', '', $phone);

        if (str_starts_with($value, '+62')) {
            return '0' . substr($value, 3);
        }

        if (str_starts_with($value, '62')) {
            return '0' . substr($value, 2);
        }

        return $value;
    }
}