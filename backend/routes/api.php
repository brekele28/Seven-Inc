<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\NavbarLogoController;
use App\Http\Controllers\Api\FileController;
use App\Http\Controllers\Api\LowonganController;
use App\Http\Controllers\Api\PublicLamaranController;
use App\Http\Controllers\Api\AdminPelamarController;
use App\Http\Controllers\Api\AdminRecruitmentActionController;
use App\Http\Controllers\Api\Loker\PublicKarirLokerController;
use App\Http\Controllers\Api\Loker\AdminKarirLokerController;

/*
|--------------------------------------------------------------------------
| API Routes - Website Seven Inc
|--------------------------------------------------------------------------
*/

// --- JALAN UMUM (Siapa saja boleh lewat) ---
Route::post('/verify-pin', [AuthController::class, 'verifyPin']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// PUBLIC: logo navbar final (DB kalau ada, fallback default kalau kosong)
Route::get('/public/navbar/logo', [NavbarLogoController::class, 'publicShow']);

// PUBLIC: lowongan kerja untuk halaman user
Route::get('/public/lowongan', [LowonganController::class, 'publicIndex']);
Route::get('/public/lowongan/{lowongan}', [LowonganController::class, 'publicShow']);

// PUBLIC: karir loker
Route::get('/public/karir-loker', [PublicKarirLokerController::class, 'index']);

// PUBLIC: lamaran kerja dari halaman user
Route::post('/public/lamaran', [PublicLamaranController::class, 'store']);
Route::get('/public/lamaran/{kodeLamaran}', [PublicLamaranController::class, 'show']);
Route::get('/public/lamaran-search', [PublicLamaranController::class, 'searchByPhone']);

// PUBLIC: preview CV PDF
Route::get('/public/cv/{id}', [FileController::class, 'previewCv']);

// --- LORONG RAHASIA (Hanya untuk Admin yang punya Gelang Ajaib) ---
Route::middleware('admin.auth')->group(function () {

    Route::get('/admin/profile', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/token-info', [AuthController::class, 'tokenInfo']);

    Route::get('/admin/dashboard', function () {
        return response()->json([
            'message' => 'Selamat datang di Ruang Kendali Seven Inc, Admin!',
            'status' => 'Sangat Aman!',
        ]);
    });

    // ADMIN: navbar logo management
    Route::get('/admin/navbar/logo', [NavbarLogoController::class, 'adminShow']);
    Route::post('/admin/navbar/logo', [NavbarLogoController::class, 'upsert']);
    Route::delete('/admin/navbar/logo', [NavbarLogoController::class, 'destroy']);

    // ADMIN: lowongan management
    Route::get('/admin/lowongan', [LowonganController::class, 'index']);
    Route::post('/admin/lowongan', [LowonganController::class, 'store']);
    Route::get('/admin/lowongan/{lowongan}', [LowonganController::class, 'show']);
    Route::put('/admin/lowongan/{lowongan}', [LowonganController::class, 'update']);
    Route::patch('/admin/lowongan/{lowongan}/publish', [LowonganController::class, 'publish']);
    Route::patch('/admin/lowongan/{lowongan}/close', [LowonganController::class, 'close']);
    Route::delete('/admin/lowongan/{lowongan}', [LowonganController::class, 'destroy']);

    // ADMIN: karir loker management
    Route::get('/admin/karir-loker', [AdminKarirLokerController::class, 'index']);
    Route::post('/admin/karir-loker', [AdminKarirLokerController::class, 'store']);
    Route::get('/admin/karir-loker/{id}', [AdminKarirLokerController::class, 'show']);
    Route::put('/admin/karir-loker/{id}', [AdminKarirLokerController::class, 'update']);
    Route::delete('/admin/karir-loker/{id}', [AdminKarirLokerController::class, 'destroy']);

    Route::post(
        '/admin/karir-loker/{id}/upload-image',
        [AdminKarirLokerController::class, 'uploadHeroImage']
    );

    Route::delete(
        '/admin/karir-loker/{id}/image',
        [AdminKarirLokerController::class, 'deleteHeroImage']
    );

    // ADMIN: pelamar / lamaran management
    Route::get('/admin/e-recruitment/pelamar', [AdminPelamarController::class, 'index']);
    Route::get('/admin/e-recruitment/pelamar/{id}', [AdminPelamarController::class, 'show']);
    Route::patch('/admin/e-recruitment/pelamar/{id}/status', [AdminPelamarController::class, 'updateStatus']);
    Route::delete('/admin/e-recruitment/pelamar/{id}', [AdminPelamarController::class, 'destroy']);

    // ADMIN: recruitment actions
    Route::patch('/admin/e-recruitment/pelamar/{lamaran}/interview', [AdminRecruitmentActionController::class, 'scheduleInterview']);
    Route::patch('/admin/e-recruitment/pelamar/{lamaran}/accept', [AdminRecruitmentActionController::class, 'accept']);
    Route::patch('/admin/e-recruitment/pelamar/{lamaran}/reject', [AdminRecruitmentActionController::class, 'reject']);
    Route::patch('/admin/e-recruitment/pelamar/{lamaran}/expire', [AdminRecruitmentActionController::class, 'expire']);
});