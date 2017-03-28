<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    protected $toTruncate = ['users', 'tasks'];
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        DB::statement("SET foreign_key_checks = 0");
        foreach ($this->toTruncate as $table) {
            DB::table($table)->truncate();
        }
        $this->call(UsersTableSeeder::class);
        $this->call(TasksTableSeeder::class);
    }
}
