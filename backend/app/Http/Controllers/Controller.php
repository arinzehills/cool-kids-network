<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function successResponse($data = null, $message = 'Success', $statusCode = 200): JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => $message,
            'data' => $data,
        ], $statusCode);
    }

    protected function errorResponse($message = 'Error', $statusCode = 400, $data = null): JsonResponse
    {
        return response()->json([
            'status' => false,
            'message' => $message,
            'data' => $data,
        ], $statusCode);
    }

    protected function notFoundResponse($message = 'Resource not found'): JsonResponse
    {
        return $this->errorResponse($message, 404);
    }

    protected function forbiddenResponse($message = 'Forbidden'): JsonResponse
    {
        return $this->errorResponse($message, 403);
    }

    protected function unauthorizedResponse($message = 'Unauthorized'): JsonResponse
    {
        return $this->errorResponse($message, 401);
    }

    protected function validationErrorResponse($message = 'Validation failed', $errors = null): JsonResponse
    {
        return response()->json([
            'status' => false,
            'message' => $message,
            'errors' => $errors,
        ], 422);
    }

    protected function serverErrorResponse($message = 'Internal Server Error'): JsonResponse
    {
        return $this->errorResponse($message, 500);
    }

    protected function customResponse($message, $statusCode, $data = null): JsonResponse
    {
        $isSuccess = $statusCode >= 200 && $statusCode < 300;

        return response()->json([
            'status' => $isSuccess,
            'message' => $message,
            'data' => $data,
        ], $statusCode);
    }
}
