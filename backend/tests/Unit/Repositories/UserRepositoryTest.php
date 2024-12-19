<?php

namespace Tests\Unit\Repositories;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserRepositoryTest extends TestCase
{
    use RefreshDatabase;

    protected $userRepository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->userRepository = new UserRepository(new User);
    }

    /** @test */
    public function it_can_get_all_users()
    {
        User::factory()->count(3)->create();

        $users = $this->userRepository->getAllUsers();

        $this->assertCount(3, $users);
    }

    /** @test */
    public function it_can_create_a_user()
    {
        $data = [
            'email' => 'test@example.com',
            'first_name' => 'John',
            'last_name' => 'Doe',
            'country' => 'Nigeria',
            'role' => 'Cool Kid',
            'password' => 'password123',
        ];

        $user = $this->userRepository->createUser($data);

        $this->assertInstanceOf(User::class, $user);
        $this->assertDatabaseHas('users', ['email' => 'test@example.com']);
    }

    /** @test */
    public function it_can_find_a_user_by_email()
    {
        $user = User::factory()->create(['email' => 'john@example.com']);

        $foundUser = $this->userRepository->getUserByEmail('john@example.com');

        $this->assertEquals($user->id, $foundUser->id);
    }

    /** @test */
    public function it_can_update_user_role()
    {
        $user = User::factory()->create(['role' => 'User']);

        $updatedUser = $this->userRepository->updateUserRole($user, 'Admin');

        $this->assertEquals('Admin', $updatedUser->role);
        $this->assertDatabaseHas('users', ['id' => $user->id, 'role' => 'Admin']);
    }
}
