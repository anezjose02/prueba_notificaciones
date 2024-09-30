<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
    protected $table = 'user_roles';

    protected $fillable = [
        'name'
    ];

    const ADMIN = 1;
    const EMPLOYEE = 2;
    public function user()
    {
        return $this->hasMany(User::class);
    }
}
