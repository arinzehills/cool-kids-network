<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Services\UserService;
use App\Http\Requests\RoleUpdateRequest;
use App\Models\User;
use Mockery;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AdminControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $userServiceMock;
    protected $token;

    public function setUp(): void
    {
        parent::setUp();

        $user = User::factory()->create([
            'first_name' => 'Admin',
            'last_name' => 'aUser',
            'country' =>  'Nigeria',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            "role" => User::ROLE_MAINTAINER
        ]);
        $this->token = JWTAuth::fromUser($user);
        $this->userServiceMock = Mockery::mock(UserService::class);
        $this->app->instance(UserService::class, $this->userServiceMock);
    }

    public function it_fails_validation_when_required_fields_are_missing()
    {

        $payload = [];

        $response = $this->postJson('/api/admin/assign-role', $payload);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email', 'role']);
    }


    public function it_assigns_a_role_successfully_with_jwt_authorization()
    {
        $payload = [
            'email' => 'test@example.com',
            'role' => 'Admin',
        ];

        $this->userServiceMock
            ->shouldReceive('assignRole')
            ->once()
            ->with($payload['email'], $payload['role'])
            ->andReturnTrue();


        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/admin/assign-role', $payload);


        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Role updated successfully',
            ]);
    }

    /** @test */
    public function it_fails_if_no_jwt_token_is_provided()
    {

        $payload = [
            'email' => 'test@example.com',
            'role' => 'Admin',
        ];

        $response = $this->postJson('/api/admin/assign-role', $payload);


        $response->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthenticated.',
            ]);
    }


    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
