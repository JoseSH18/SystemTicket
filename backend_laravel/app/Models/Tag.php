<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = ['tag'];
    public function tickets()
    {
        return $this->belongsToMany(Ticket::class, 'tag_ticket', 'id_Tag', 'id_Ticket');
    }
    use HasFactory;
}
