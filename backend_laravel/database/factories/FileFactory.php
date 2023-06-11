<?php

namespace Database\Factories;
use App\Models\Ticket;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Http\UploadedFile;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\File>
 */
class FileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'file' => UploadedFile::fake()->create('file.txt'),
            'id_Ticket' => function () {
                return Ticket::factory()->create();
            },
        ];
    }
}
