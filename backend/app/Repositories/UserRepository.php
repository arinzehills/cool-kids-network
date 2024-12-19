<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    protected $User;

    public function __construct(User $User)
    {
        $this->User = $User;
    }

    public function getAllUsers()
    {
        return $this->User->all();
    }

    public function createUser(array $data)
    {
        return User::create($data);
    }

    public function getUserByEmail($email)
    {
        return User::where('email', $email)->first();
    }

    public function getUsersWithSpecificFields($fields)
    {
        return User::select($fields)->get();
    }

    public function updateUserRole(User $user, $role)
    {
        $user->role = $role;
        $user->save();

        return $user;
    }

    public function updateUserProfile(User $user, array $data)
    {
        $user->update($data);

        return $user->fresh();
    }
}
