<?php

use Illuminate\Database\Seeder;
use App\User;
class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name'  => 'Anakin Skywalker',
            'email' => 'anakin@starwars.com',
            'password' => bcrypt('secret'),
            'api_token' => str_random(60)
        ]);
        User::create([
            [
                'name'  => 'Luke Skywalker',
                'email' => 'luke@starwars.com',
                'password' => bcrypt('secret'),
                'api_token' => str_random(60)
            ]
        ]);
    }
}
