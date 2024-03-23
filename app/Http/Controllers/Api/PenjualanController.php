<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PenjualanResource;
use App\Http\Resources\KomisiResource;
use App\Models\Marketing;
use App\Models\Penjualan;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PenjualanController extends Controller
{
    public function index()
    {
        return PenjualanResource::collection(
            Penjualan::get()
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Penjualan $penjualan)
    {
        return new PenjualanResource($penjualan);
    }

    public function komisi()
    {
        $marketing = Marketing::get();
        
        if ($marketing->count() < 1)
        {
            throw new NotFoundHttpException();
        }

        $result = [];
        $i = 1;

        foreach ($marketing as $value_marketing)
        {
            foreach ($this->getKomisiMarketing($value_marketing->id) as $value_komisiMarketing) {
                $result[$i] = $value_komisiMarketing;
                $result[$i]['key'] = $i;
                $i++;
            }
        }

        usort($result, fn($a, $b) => $a['bulanAngka'] <=> $b['bulanAngka']);

        return KomisiResource::collection($result);
    }

    public function komisiMarketing($marketing_id)
    {
        return response()->json($this->getKomisiMarketing($marketing_id));
    }

    public function getKomisiMarketing($marketing_id)
    {
        $penjualan = new Penjualan();
        $penjualanPerBulan = $penjualan->getGrandTotalPerBulan($marketing_id);

        if ($penjualanPerBulan->count() < 1)
        {
            throw new NotFoundHttpException();
        }

        foreach ($penjualanPerBulan as $key_penjualanPerBulan =>  $value_penjualanPerBulan)
        {
            $marketing = Marketing::where('id', $marketing_id)->first();
            $komisi = $this->getKomisi($value_penjualanPerBulan->omzet);

            $result[] = [
                'bulanAngka' => $value_penjualanPerBulan->bulanAngka,
                'marketing_name' => $marketing->name,
                'bulan' => $value_penjualanPerBulan->bulan,
                'omzet' => number_format($value_penjualanPerBulan->omzet, 0, ',', '.'),
                'komisi_persen' => ($this->getKomisiPersen($value_penjualanPerBulan->omzet) * 100) . '%',
                'komisi_nominal' => number_format($komisi, 0, ',', '.')
            ];
        }

        return $result;
    }

    public function getKomisiPersen(int $omzet) {
        if ($omzet <= 100000000) {
            return 0; // 0%
        } elseif ($omzet >= 100000000 && $omzet <= 200000000) {
            return 0.025; // 2.5%
        } elseif ($omzet >= 200000000 && $omzet <= 500000000) {
            return 0.05; // 5%
        } else {
            return 0.1; // 10%
        }
    }

    public function getKomisi(int $omzet)
    {
        $komisiPersen = $this->getKomisiPersen($omzet);
        return $omzet * $komisiPersen;
    }
}
