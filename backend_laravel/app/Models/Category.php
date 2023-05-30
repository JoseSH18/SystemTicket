<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['category'];
    public function tickets()
    {
        return $this->belongsToMany(Ticket::class, 'category_ticket', 'id_Category', 'id_Ticket');
    }
    use HasFactory;
}
