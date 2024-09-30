<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'last_name',
        'second_last_name',
        'email',
        'phone',
        'password',
        'active',
        'email_verified_at',
        'user_role_id'
    ];

    protected $casts = [
        'active' => 'bool'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function getFullNameAttribute()
    {
        return "{$this->name} {$this->last_name}";
    }
    public function role()
    {
        return $this->belongsTo(UserRole::class, 'user_rol_id');
    }
    public function hasRole(string $role): bool
    {
        return strtoupper($this->role->name) == strtoupper($role);
    }

    public function image()
    {
        return $this->morphOne(Image::class, 'image');
    }
}
