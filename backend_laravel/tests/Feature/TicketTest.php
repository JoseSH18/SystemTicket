<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use App\Models\User;
use App\Models\Priority;
use App\Models\Category;
use App\Models\Status;
use App\Models\Tag;
use App\Models\File;
use App\Models\Ticket;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Testing\Fluent\AssertableJson;

class TicketTest extends TestCase
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
    public function test_create_ticket(): void
    {
        $user = User::factory()->create();
        $user->assignRole('User');
        $priorities = Priority::factory()->count(3)->create();
        $statuses = Status::factory()->count(2)->create();
        $tags = Tag::factory()->count(2)->create();
        $categories = Category::factory()->count(2)->create();

        $token = JWTAuth::fromUser($user);
        $randomPriority = $priorities->random();
        $randomStatus = $statuses->random();
        $ticket = Ticket::factory()->make();
        $file = File::factory()->count(2)->create();
        $idsCategories = $categories->pluck('id');
        $idsTags = $tags->pluck('id');

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->post(route('api.tickets.store'), [
            'id_Priority' => $randomPriority->id,
            'id_Status' => $randomStatus->id,
            'title' => $ticket->title,
            'text_Description' => $ticket->text_Description,
            'file[]' => $file->pluck('file')->toArray(),
            'idsCategories[]' => $idsCategories,
            'idsTags[]' => $idsTags,
        ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('tickets', [
            'title' => $ticket->title,
            'text_Description' => $ticket->text_Description,
            'id_Priority' => $randomPriority->id,
            'id_Status' => $randomStatus->id,
        ]);
    }
     /**
     * A basic feature test example.
     */
    public function test_see_all_associated_tickets(): void
    {
        $tickets = Ticket::factory()->count(5)->create();
        $randomTicket = $tickets->random();
        $ticketsUser = Ticket::where('id_User', $randomTicket->id_User)->get();
        $user = User::find($randomTicket->id_User);
        $token = JWTAuth::fromUser($user);
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->get(route('api.tickets.index'));
        $response->assertJson($ticketsUser->toArray());

    }
}
