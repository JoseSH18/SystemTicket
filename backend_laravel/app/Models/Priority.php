<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Priority extends Model
{
    protected $fillable = [
        'type',
    ];
    public function ticket()
    {
        return $this->hasOne(Ticket::class, 'id_Priority');
    }
    use HasFactory;
}
