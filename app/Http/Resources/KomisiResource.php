<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KomisiResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'key' => $this['key'],
            'bulanAngka' => $this['bulanAngka'],
            'marketing_name' => $this['marketing_name'],
            'bulan' => $this['bulan'],
            'omzet' => $this['omzet'],
            'komisi_persen' => $this['komisi_persen'],
            'komisi_nominal' => $this['komisi_nominal']
        ];
    }
}