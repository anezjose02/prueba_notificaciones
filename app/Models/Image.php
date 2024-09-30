<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Image extends Model
{
    use HasFactory;

    protected $table = 'images';

    protected $casts = [
        'image_id' => 'int'
    ];

    protected $fillable = [
        'url',
        'image_type',
        'image_id'
    ];

    public function image()
    {
        return $this->morphTo();
    }
}

