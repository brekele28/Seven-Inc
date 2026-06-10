<?php

namespace App\Http\Controllers\Api\Loker;

use App\Http\Controllers\Controller;
use App\Http\Requests\Loker\StoreKarirLokerRequest;
use App\Http\Requests\Loker\UpdateKarirLokerRequest;
use App\Http\Requests\Loker\UploadKarirLokerImageRequest;
use App\Models\Loker\KarirLoker;
use Illuminate\Support\Facades\Storage;

class AdminKarirLokerController extends Controller
{
    public function index()
    {
        $data = KarirLoker::first();
        return response()->json([
            'message' => 'Data Karir Loker berhasil diambil',
            'data' => $data,
        ]);
    }

    public function store(StoreKarirLokerRequest $request)
    {
        $data = KarirLoker::create($request->validated());
        return response()->json([
            'message' => 'Karir Loker berhasil dibuat',
            'data' => $data,
        ]);
    }

    public function show($id)
    {
        $data = KarirLoker::findOrFail($id);
        return response()->json([
            'message' => 'Detail Karir Loker',
            'data' => $data,
        ]);
    }

    public function update(UpdateKarirLokerRequest $request, $id)
    {
        $data = KarirLoker::findOrFail($id);
        $data->update($request->validated());
        return response()->json([
            'message' => 'Karir Loker berhasil diupdate',
            'data' => $data,
        ]);
    }

    public function destroy($id)
    {
        $data = KarirLoker::findOrFail($id);

        // hapus hero image dari storage
        if ($data->hero_image && Storage::disk('public')->exists($data->hero_image)) {
            Storage::disk('public')->delete($data->hero_image);
        }

        $data->delete();
        return response()->json([
            'message' => 'Karir Loker berhasil dihapus',
        ]);
    }

    public function uploadHeroImage(UploadKarirLokerImageRequest $request, $id)
    {
        $data = KarirLoker::findOrFail($id);

        // hapus image lama
        if ($data->hero_image && Storage::disk('public')->exists($data->hero_image)) {
            Storage::disk('public')->delete($data->hero_image);
        }

        $path = $request->file('hero_image')->store('karir-loker/hero', 'public');
        $data->update(['hero_image' => $path]);

        return response()->json([
            'message' => 'Hero image berhasil diupload',
            'data' => $data,
        ]);
    }

    public function deleteHeroImage($id)
    {
        $data = KarirLoker::findOrFail($id);

        if ($data->hero_image && Storage::disk('public')->exists($data->hero_image)) {
            Storage::disk('public')->delete($data->hero_image);
            $data->update(['hero_image' => null]);
        }

        return response()->json([
            'message' => 'Hero image berhasil dihapus',
            'data' => $data,
        ]);
    }
}