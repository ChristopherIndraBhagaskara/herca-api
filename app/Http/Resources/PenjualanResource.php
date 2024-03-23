<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PenjualanResource extends JsonResource
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
            'id' => $this->id,
            'transaction_number' => $this->transaction_number,
            'marketing_id' => $this->marketing_id,
            'marketing_name' => $this->marketing->name,
            'date' => $this->date,
            'cargo_fee' => $this->cargo_fee,
            'total_balance' => $this->total_balance,
            'grand_total' => $this->grand_total,
        ];
    }
}