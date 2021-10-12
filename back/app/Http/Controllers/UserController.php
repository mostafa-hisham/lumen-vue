<?php

namespace App\Http\Controllers;

use App\Models\User;
use Laravel\Lumen\Routing\Controller as BaseController;

class UserController extends BaseController
{
    /**
     * Get the Users List.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function users()
    {
        return response()->json(User::all('id','name','email'));
    }
}
