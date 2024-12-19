<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleUpdateRequest;
use App\Services\UserService;

class AdminController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function assignRole(RoleUpdateRequest $request)
    {
        $user = $this->userService->assignRole($request->email, $request->role);

        return response()->json(['message' => 'Role updated successfully']);
    }
}
