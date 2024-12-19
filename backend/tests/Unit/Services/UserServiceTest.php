<?php

namespace Tests\Unit\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use App\Services\UserService;
use Illuminate\Support\Facades\Hash;
use Mockery;
use Mockery\MockInterface;
use Tests\TestCase;

// use Mockery\LegacyMockInterface;

class UserServiceTest extends TestCase
{
    /**
     * @var UserRepository&LegacyMockInterface&MockInterface
     */
    protected $userRepositoryMock;

    protected $userService;

    protected function setUp(): void
    {
        parent::setUp();

        // Create a mock for UserRepository
        $this->userRepositoryMock = Mockery::mock(UserRepository::class);

        // Instantiate UserService with the mock
        $this->userService = new UserService($this->userRepositoryMock);
    }

    /** @test */
    public function it_can_get_all_users()
    {
        $this->userRepositoryMock
            ->shouldReceive('getAllUsers')
            ->once()
            ->andReturn(['user1', 'user2']);

        $users = $this->userService->getAll();

        $this->assertCount(2, $users);
    }

    /** @test */
    public function it_can_find_user_by_email()
    {
        $user = ['email' => 'john@example.com', 'first_name' => 'John'];

        $this->userRepositoryMock
            ->shouldReceive('getUserByEmail')
            ->once()
            ->with('john@example.com')
            ->andReturn($user);

        $result = $this->userService->getUserByEmail('john@example.com');

        $this->assertEquals($user, $result);
    }

    /** @test */
    public function it_can_register_a_user()
    {
        $data = ['email' => 'newuser@example.com'];
        $fakeIdentity = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'country' => 'Nigeria',
            'email' => 'newuser@example.com',
        ];

        // Modify to use a callback or dependency injection for testing
        $this->userService = new UserService(
            $this->userRepositoryMock,
            function () use ($fakeIdentity) {
                return $fakeIdentity;
            }
        );

        $this->userRepositoryMock
            ->shouldReceive('createUser')
            ->once()
            ->with(Mockery::on(function ($userData) {
                return $userData['email'] === 'newuser@example.com' &&
                    Hash::check('password', $userData['password']);
            }))
            ->andReturnTrue();

        $result = $this->userService->registerUser($data);
        $this->assertTrue($result);
    }

    /** @test */
    public function it_can_assign_a_role_to_user()
    {
        $email = 'john@example.com';
        $role = User::ROLE_MAINTAINER;

        $user = new User;
        $user->email = $email;
        $user->role = User::ROLE_COOLEST_KID;

        $this->userRepositoryMock
            ->shouldReceive('getUserByEmail')
            ->once()
            ->with($email)
            ->andReturn($user);

        $this->userRepositoryMock
            ->shouldReceive('updateUserRole')
            ->once()
            ->with($user, $role)
            ->andReturn(tap($user, function ($u) use ($role) {
                $u->role = $role;
            }));

        $result = $this->userService->assignRole($email, $role);

        // Assert
        $this->assertEquals($role, $result->role);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
