<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(
    [ 'prefix' => 'api', 'middleware' => ['cors'] ],
    function () use ($router) {
        $router->post('/register',  [ 'uses' => 'AuthController@register' ]);
        $router->post('/login', 'AuthController@login');
        $router->get('/users', 'UserController@users');
    }
);

// Users
$router->group(['prefix' => 'api','middleware' => ['cors','auth']], function () use ($router) {
    $router->get('/me', 'AuthController@me');
    $router->get('/refresh', 'AuthController@refresh');
});
