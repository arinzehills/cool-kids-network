<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $userRepository;
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function index(Request $request)
    {
        $user = auth()->user();

        return $this->successResponse(['user' => $user]);
    }

    public function getUsers(Request $request)
    {
        $user = auth()->user();

        if ($user->role === 'Coolest Kid' || $user->role === User::ROLE_MAINTAINER) {
            $users = $this->userRepository->getAllUsers();
        } elseif ($user->role === 'Cooler Kid') {
            $users = $this->userRepository->getUsersWithSpecificFields(['first_name', 'last_name', 'country']);
        } else {
            return response()->json(['message' => 'Access denied'], 403);
        }

        return  $this->successResponse(['users' => $users]);
    }
    public function updateProfile(UpdateProfileRequest $request)
    {
        $user = auth()->user();
        $updatedUser = $this->userRepository->updateUserProfile($user, $request->validated());

        return $this->successResponse(['user' => $updatedUser], 'Profile updated successfully');
    }
}
