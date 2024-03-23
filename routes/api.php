<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PenjualanController;
use App\Http\Controllers\Api\PembayaranController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/penjualan', [PenjualanController::class, 'index']);
Route::get('/komisi', [PenjualanController::class, 'komisi']);
Route::get('/komisi/{marketing}', [PenjualanController::class, 'komisiMarketing']);
Route::apiResource('/pembayaran', PembayaranController::class);