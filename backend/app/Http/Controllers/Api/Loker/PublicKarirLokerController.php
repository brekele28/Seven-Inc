<?php

namespace App\Http\Controllers\Api\Loker;

use App\Http\Controllers\Controller;
use App\Models\Loker\KarirLoker;

class PublicKarirLokerController extends Controller
{
    public function index()
    {
        $data = KarirLoker::first();
        return response()->json([
            'message' => 'Data Karir Loker berhasil diambil',
            'data' => $data,
        ]);
    }
}