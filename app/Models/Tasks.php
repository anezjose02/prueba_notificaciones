<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
    use HasFactory;
    protected $table = 'tasks';
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'tasks_status_id',
        'user_id',
        'admin_id',
    ];

    public function status()
    {
        return $this->belongsTo(TasksStatus::class, 'tasks_status_id');
    }

    public function userTo()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function userFrom()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

}

