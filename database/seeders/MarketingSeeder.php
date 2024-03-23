<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;

class MarketingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $seed = [
            ['id' => '1', 'name' => 'Alfandy'],
            ['id' => '2', 'name' => 'Mery'],
            ['id' => '3', 'name' => 'Danang'],
        ];
 
        DB::table('marketing')->insert($seed);
    }
}
