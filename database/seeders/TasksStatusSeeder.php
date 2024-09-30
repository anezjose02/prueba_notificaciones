<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;

class TasksStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tasks_status')->insert([
            [
                'name' => 'Entregado',
            ],
            [
                'name' => 'Leido',
            ],
            [
                'name' => 'Pendiente',
            ],
            [
                'name' => 'Completado',
            ],
            [
                'name' => 'Eliminado',
            ],
        ]);
    }
}
