<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;


class LoginController extends Controller
{
    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = JWTAuth::fromUser($user);

            return response()->json([
                'user' => $user,
                'token' => $token,
                'role' => $user->roles->first()->name,
            ]);
        }

        throw ValidationException::withMessages([
            'email' => ['Las credenciales son incorrectas.'],
        ]);
    }

    /**
     * Log the user out of the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        $token = $request->user()->currentAccessToken();
        var_dump($token);
        if ($token) {
            $token->delete();
        }

        return response()->json([
            'message' => 'Cierre de sesión exitoso.',
        ]);
    }

    /**
     * Verificar la autenticación del usuario.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function isAuthenticated(Request $request)
    {
        try {
            // Verificar el token JWT y obtener el usuario autenticado
            $user = JWTAuth::parseToken()->authenticate();

    
            return response()->json([
                'isAuthenticated' => true,
                'user' => $user,
                'role' => $user->roles->first()->name,
            ]);
        } catch (\Exception $e) {
            // Manejar cualquier excepción que ocurra durante la verificación del token
            return response()->json([
                'isAuthenticated' => false,
                'message' => 'Error al verificar la autenticación.'
            ], 401);
        }
    }
}
