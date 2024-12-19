<?php

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;

class UserService
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getAll()
    {
        return $this->userRepository->getAllUsers();
    }

    public function getUserByEmail(string $email)
    {
        return $this->userRepository->getUserByEmail($email);
    }

    public function registerUser(array $data)
    {
        // $user = $this->getUserByEmail($data['email']);
        // if ($user != null) {
        //     throw new \Exception("User already exists", 409);
        // }
        $identity = $this->generateFakeIdentity($data['email']);

        return $this->userRepository->createUser([
            'email' => $data['email'],
            'first_name' => $identity['first_name'],
            'last_name' => $identity['last_name'],
            'country' => $identity['country'],
            'role' => 'Cool Kid',
            'password' => Hash::make('password'),
        ]);
    }

    protected function generateFakeIdentity($email)
    {
        $response = json_decode(file_get_contents('https://randomuser.me/api/'), true);
        $user = $response['results'][0];

        return [
            'first_name' => $user['name']['first'],
            'last_name' => $user['name']['last'],
            'country' => $user['location']['country'],
            'email' => $email,
        ];
    }

    public function assignRole($email, $role)
    {
        $user = $this->userRepository->getUserByEmail($email);

        return $this->userRepository->updateUserRole($user, $role);
    }
}
