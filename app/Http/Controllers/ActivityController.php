<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ActivityController extends Controller
{
    protected $user;
    public function __construct()
    {
        $this->user = Auth::guard('api')->user();
    }
    public function index()
    {
        return $this->user->activities;
    }

    public function last60Minutes()
    {
        return $this->user->activities()->last60Minutes()->get();
    }
}
