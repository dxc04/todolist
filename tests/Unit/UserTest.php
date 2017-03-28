<?php

namespace Tests\Unit;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class UserTest extends TestCase
{
    /**
     * Test to see whether user table has at least one record.
     *
     * @return void
     */

    public function testHasAtleastOneUser()
    {
        $users = User::all();
        $this->assertGreaterThanOrEqual(1, $users->count());
    }
}
