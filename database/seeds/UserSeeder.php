<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([ 'name' => 'Administrador', 'email'=>'prueba@tiempo.test', 'password' =>Hash::make('prueba')]);
    }
}
