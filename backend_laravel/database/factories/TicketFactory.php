<?php

namespace Database\Factories;
use App\Models\Priority;
use App\Models\Status;
use App\Models\User;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->text(10),
            'text_Description' => fake()->text(100),
            'id_Priority' => function () {
                return Priority::factory()->create();
            },
            'id_Status' => function () {
                return Status::factory()->create();
            },
            'id_User' => function () {
                return User::factory()->create();
            },
        ];
    }
}
