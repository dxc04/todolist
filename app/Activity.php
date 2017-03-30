<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = ['user_id', 'pending_tasks', 'completed_tasks'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeLast60Minutes($query) {
        $fromDate = Carbon::now()->subMinutes(60);
        $toDate = Carbon::now();
        return $query->whereBetween('created_at', [$fromDate, $toDate]);
    }

}
