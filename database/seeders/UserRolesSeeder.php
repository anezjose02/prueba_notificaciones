<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_roles')->insert([
            [
                'name' => 'Administrador',
            ],
            [
                'name' => 'Empleados',
            ]

        ]);

        DB::table('users')->insert([
            [
                'name' => 'Admin',
                'last_name' => 'admin',
                'second_last_name' => 'Home',
                'email' => 'admin@gmail.com',
                'phone' => '12345678',
                'user_rol_id' => 1,
                'password' => env('APP_DEBUG',true) ? Hash::make('Prueba123') : Hash::make('R3DH0M3'),
                'active' => true,
            ]
        ]);
    }
}
