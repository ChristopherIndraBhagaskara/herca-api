<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Penjualan extends Model
{
    use HasFactory;
    protected $table = 'penjualan';
    protected $primaryKey = 'id';
    protected $fillable = [
        'transaction_number',
        'marketing_id',
        'date',
        'cargo_fee',
        'total_balance',
        'grand_total'
    ];

    public function marketing()
    {
        return $this->belongsTo(Marketing::class, 'marketing_id');
    }

    public function getGrandTotalPerBulan($marketing_id)
    {
        return $this->select(
            DB::raw('sum(grand_total) as omzet'), 
            DB::raw("DATE_FORMAT(date,'%M %Y') as bulan"),
            DB::raw("DATE_FORMAT(date,'%m') as bulanAngka")
        )
        ->when($marketing_id, function ($query, $marketing_id)
        {
            $query->where('marketing_id', $marketing_id);
        })
        ->groupBy('bulanAngka', 'bulan')
        ->orderBy('bulanAngka', 'asc')
        ->get();
    }
}
