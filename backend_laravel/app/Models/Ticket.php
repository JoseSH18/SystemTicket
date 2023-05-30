<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $fillable = [
        'title',
        'text_Description',
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'id_User');
    }

    // Relación muchos a uno con el modelo User (para id_Agent)
    public function agent()
    {
        return $this->belongsTo(User::class, 'id_Agent');
    }
    public function priority()
    {
        return $this->belongsTo(Priority::class, 'id_Priority');
    }

    // Relación uno a uno con el modelo Status
    public function status()
    {
        return $this->belongsTo(Status::class, 'id_Status');
    }

    public function files()
    {
        return $this->hasMany(File::class, 'id_Ticket');
    }
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_ticket', 'id_Ticket', 'id_Category');
    }
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'tag_ticket', 'id_Ticket', 'id_Tag');
    }
    use HasFactory;
}
