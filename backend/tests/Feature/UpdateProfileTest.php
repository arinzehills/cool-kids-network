<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UpdateProfileTest extends TestCase
{
    // use RefreshDatabase;
    /** @test */
    public function it_requires_authentication()
    {

        $response = $this->putJson('/api/user', [
            'first_name' => 'UnauthorizedUpdate',
        ]);
        $response->assertStatus(401);
    }
}
