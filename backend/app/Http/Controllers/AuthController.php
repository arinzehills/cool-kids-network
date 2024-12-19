<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Services\UserService;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function register(SignupRequest $request)
    {
        try {
            $user = $this->userService->registerUser($request->validated());

            return response()->json(['message' => 'User registered successfully', 'data' => $user]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "$th->getMessage()",
                'error' => true,
            ], 400);
        }
    }

    public function login(LoginRequest $request)
    {
        $token = JWTAuth::attempt(['email' => $request->only('email'), 'password' => 'password']);
        if (! $token) {
            return $this->unauthorizedResponse('User Record not found, sign up');
        }
        $user = auth()->user();

        return $this->successResponse(['token' => $token, 'user' => $user]);
    }
}
