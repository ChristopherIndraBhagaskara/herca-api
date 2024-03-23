<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePembayaranRequest;
use App\Http\Requests\UpdatePembayaranRequest;
use App\Http\Resources\PembayaranResource;
use App\Models\Pembayaran;
use App\Models\Penjualan;

class PembayaranController extends Controller
{
    public function index()
    {
        return PembayaranResource::collection(
            Pembayaran::query()->orderBy('id', 'desc')->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePembayaranRequest $request)
    {
        if ($request->validated())
        {
            if($this->countKekuranganPembayaran($request->penjualan_id) > 0)
            {
                if(
                    $this->countSisaSetelahDibayar($request->penjualan_id, $request->value) === 0
                    || $this->countSisaSetelahDibayar($request->penjualan_id, $request->value) > 0
                )
                {
                    $pembayaran = new Pembayaran();
                    $pembayaran->transaction_number = $this->getTrxCode();
                    $pembayaran->penjualan_id = $request->penjualan_id;
                    $pembayaran->date = $request->date;
                    $pembayaran->note = $request->note;
                    $pembayaran->value = $request->value;
                    $pembayaran->save();
        
                    return (new PembayaranResource($pembayaran))
                        ->response()
                        ->setStatusCode(201);
                }

                return response()->json(['message' => 'Pembayaran tidak boleh melebihi sisa cicilan'], 400);
            }

            return response()->json(['message' => 'Sudah Lunas'], 400);
        }

        return response()->json(['message' => 'Data not validated'], 400);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pembayaran $pembayaran)
    {
        return new PembayaranResource($pembayaran);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePembayaranRequest $request, Pembayaran $pembayaran)
    {
        if ($request->validated())
        {
            $updateValuePembayaran = $request->value - $pembayaran->value;

            if(
                $this->countSisaSetelahDibayar($request->penjualan_id, $updateValuePembayaran) === 0
                || $this->countSisaSetelahDibayar($request->penjualan_id, $updateValuePembayaran) > 0
            )
            {
                $pembayaran->penjualan_id = $request->penjualan_id;
                $pembayaran->date = $request->date;
                $pembayaran->note = $request->note;
                $pembayaran->value = $request->value;
                $pembayaran->save();
    
                return (new PembayaranResource($pembayaran))
                    ->response()
                    ->setStatusCode(200);
            }

            return response()->json(['message' => 'Pembayaran tidak boleh melebihi sisa cicilan'], 400);
        }

        return response()->json(['message' => 'Data not validated'], 400);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pembayaran $pembayaran)
    {
        $pembayaran->delete();
        return response("", 204);
    }

    public function getTrxCode()
    {       
        $nextCode = '001';
        $getPembayaran = Pembayaran::orderBy('transaction_number', 'desc')
            ->first();

        if ($getPembayaran) {
            $getCodeNumber = substr($getPembayaran->transaction_number, -3);
            $nextCode = sprintf("%03d", (int)$getCodeNumber + 1);
        }

        $getNextPembayaranCode = 'TRX' . $nextCode;
            
        return $getNextPembayaranCode;
    }

    public function countKekuranganPembayaran($penjualan_id)
    {
        $totalCicilan = Penjualan::where('id', $penjualan_id)->pluck('grand_total')->first();
        $countTotalPembayaranSebelumnya = Pembayaran::where('penjualan_id', $penjualan_id)->sum('value');

        return $totalCicilan - $countTotalPembayaranSebelumnya;
    }

    public function countSisaSetelahDibayar($penjualan_id, $value)
    {
        $kekuranganPembayaran = $this->countKekuranganPembayaran($penjualan_id);
        $sisaSetelahDibayar = $kekuranganPembayaran - $value;

        if ($sisaSetelahDibayar >= 0)
        {
            return $sisaSetelahDibayar;
        }

        return false;
    }
}
