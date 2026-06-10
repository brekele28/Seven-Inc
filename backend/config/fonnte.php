<?php

return [
    'enabled' => env('FONNTE_ENABLED', false),
    'token' => env('FONNTE_TOKEN'),
    'base_url' => env('FONNTE_BASE_URL', 'https://api.fonnte.com'),
    'country_code' => env('FONNTE_COUNTRY_CODE', '62'),
    'connect_only' => env('FONNTE_CONNECT_ONLY', true),
];