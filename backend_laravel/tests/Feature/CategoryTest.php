<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Category;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Testing\Fluent\AssertableJson;

class CategoryTest extends TestCase
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
    public function test_create_category(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('Admin');
        $category = Category::factory()->make();
        $token = JWTAuth::fromUser($admin);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->post(route('api.categories.store'), [
            'category' => $category->category,
        ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('categories', [
            'category' => $category->category,
        ]);
    }

    public function test_see_all_categories(): void
    {
        $categories = Category::factory()->count(5)->create();
        $admin = User::factory()->create();
        $admin->assignRole('Admin');
        $token = JWTAuth::fromUser($admin);
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->get(route('api.categories.index'));

        $response->assertJson($categories->toArray());
    }
}
