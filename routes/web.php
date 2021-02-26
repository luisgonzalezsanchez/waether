<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();



//Home
Route::get('/home', 'HomeController@home')->name('home');
Route::get('/dashboard', 'HomeController@dashboard');
Route::get('/admin', 'HomeController@admin');
Route::get('auth/user', 'Auth\AuthController@user');

//Devices
Route::get('dashboard/device', 'api\v1\backend\DevicesController@index');
Route::post('dashboard/device/store', 'api\v1\backend\DevicesController@store');
Route::post('dashboard/device/search', 'api\v1\backend\DevicesController@search');
Route::post('dashboard/device/update/{id}', 'api\v1\backend\DevicesController@update');
Route::delete('dashboard/device/destroy/{id}', 'api\v1\backend\DevicesController@destroy');
//Weather
Route::get('dashboard/weather', 'api\v1\backend\WeatherController@index');
Route::post('dashboard/weather/store', 'api\v1\backend\WeatherController@store');
Route::post('dashboard/weather/search', 'api\v1\backend\WeatherController@search');
Route::delete('dashboard/weather/destroy/{id}', 'api\v1\backend\WeatherController@destroy');



Route::get('/dashboard/{route?}','BackController@routes')->where('route', '(.*)');
Route::get('/admin/{route?}','BackController@admin')->where('route', '(.*)');
Route::get('/auth/{route?}','BackController@routes2')->where('route', '(.*)');
//Route::middleware('token.login')->get('/auth/{route?}','BackController@routes2')->where('route', '(.*)');


