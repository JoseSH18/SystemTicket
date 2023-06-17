<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use App\Models\User;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        // Llamar al seeder de roles
        Artisan::call('db:seed', ['--class' => 'rolseeder']);
    }

    /**
     * A basic feature test example.
     */
    public function test_register_user(): void
    {
        $user = User::factory()->make();
        $user->assignRole('User');
        $data = $user->toArray();
        $data['password'] = $user->password;
        $data['password_confirmation'] = $user->password;
        $response = $this->post(route('api.auth.register'), $data);
    
        $response->assertStatus(201)
                 ->assertJson([
                     'user' => [
                         'name' => $user->name,
                         'last_Name' => $user->last_Name,
                         'second_Last_Name' => $user->second_Last_Name,
                     ],
                 ]);
    
        $this->assertDatabaseHas('users', [
            'email' => $user->email,
            'name' => $user->name,
            'last_Name' => $user->last_Name,
            'second_Last_Name' => $user->second_Last_Name,
        ]);
    }

        /**
     * A basic feature test example.
     */
    public function test_login_user(): void
    {
        $user = User::factory()->create();
        $user->assignRole('User');
        $data = [
            'email' => $user->email,
            'password' => 12345678,
        ];
        $response = $this->post(route('api.auth.login'), $data);
    
        $response->assertStatus(200)
                 ->assertJson([
                     'user' => [
                         'email' => $user->email,
                         'name' => $user->name,
                         'last_Name' => $user->last_Name,
                         'second_Last_Name' => $user->second_Last_Name,
                     ],
                     'token' => true,
                     'role' =>  $user->roles->first()->name,
                    
                 ]);
    }
}
