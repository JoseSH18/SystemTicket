<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Priority;
use App\Models\Status;
use App\Models\Tag;
use App\Models\Category;


class seederall extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $status1 = Status::create(['status'=>'Abierto']);
        $status2 = Status::create(['status'=>'Cerrado']);
        
        $priority1 = Priority::create(['type'=>'Alta']);
        $priority2 = Priority::create(['type'=>'Media']);
        $priority3 = Priority::create(['type'=>'Baja']);

        $tag1 = Tag::create(['tag'=>'Incidencia']);
        $tag2 = Tag::create(['tag'=>'Solicitud de servicio']);
        $tag3 = Tag::create(['tag'=>'Problema']);

        $category1 = Category::create(['category'=>'Redes']);
        $category2 = Category::create(['category'=>'Hardware']);
        $category3 = Category::create(['category'=>'Software']);


        
    }
}
