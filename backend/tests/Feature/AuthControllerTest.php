<?php

namespace Tests\Unit\Controllers;

namespace Tests\Unit\Controllers;

use App\Http\Controllers\AuthController;
use App\Http\Requests\LoginRequest;
use App\Services\UserService;
use Mockery;
use Mockery\LegacyMockInterface;
use Mockery\MockInterface;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthControllerTest extends TestCase
{

    /**
     * @var UserService&LegacyMockInterface&MockInterface
     */
    protected $userServiceMock;
    use RefreshDatabase;
    protected $authController;

    protected function setUp(): void
    {
        parent::setUp();
        $this->userServiceMock = Mockery::mock(UserService::class);
        $this->authController = new AuthController($this->userServiceMock);
    }

    /** @test */
    public function test_user_registration()
    {
        // Define user data
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'secretpassword',
            'password_confirmation' => 'secretpassword',
        ];

        // Make a POST request to the register route
        $response = $this->postJson('api/register', $userData);

        // Assert the response status
        $response->assertStatus(200);

        // Assert the success message
        $response->assertJson([
            'message' => 'User registered successfully',
        ]);

        // Assert that the user has been created in the database
        $this->assertDatabaseHas('users', [
            'email' => 'john@example.com',
        ]);
    }

    /** @test */
    public function it_can_login_with_valid_credentials()
    {
        // Prepare test data
        $loginData = [
            'email' => 'user@example.com',
            'password' => 'password',
        ];

        // Create a mock LoginRequest
        $request = Mockery::mock(LoginRequest::class);
        $request->shouldReceive('only')
            ->with('email')
            ->andReturn($loginData['email']);
        $request->shouldReceive('validated')
            ->andReturn($loginData);

        // Mock JWTAuth to return a token
        $mockToken = 'mock_jwt_token';
        JWTAuth::shouldReceive('attempt')
            ->once()
            ->with([
                'email' => $loginData['email'],
                'password' => 'password',
            ])
            ->andReturn($mockToken);

        // Call the login method
        $response = $this->authController->login($request);

        // Assert response
        $this->assertInstanceOf(\Illuminate\Http\JsonResponse::class, $response);
        $this->assertEquals(200, $response->getStatusCode());

        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals($mockToken, $responseData['data']['token']);
    }

    /** @test */
    public function it_fails_login_with_invalid_credentials()
    {
        // Prepare test data
        $loginData = [
            'email' => 'user@example.com',
            'password' => 'wrongpassword',
        ];

        // Create a mock LoginRequest
        $request = Mockery::mock(LoginRequest::class);
        $request->shouldReceive('only')
            ->with('email')
            ->andReturn($loginData['email']);
        $request->shouldReceive('validated')
            ->andReturn($loginData);

        // Mock JWTAuth to return false (no token)
        JWTAuth::shouldReceive('attempt')
            ->once()
            ->with([
                'email' => $loginData['email'],
                'password' => 'password',
            ])
            ->andReturn(false);

        // Call the login method
        $response = $this->authController->login($request);

        // Assert response
        $this->assertInstanceOf(\Illuminate\Http\JsonResponse::class, $response);

        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals('User Record not found, sign up', $responseData['message']);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
