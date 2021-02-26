<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Weather extends Model
{
    //

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'country', 'city', 'lat','lng','temperature_max','temperature_min',
        'humidity','temperature','text','wind','wind_direction','unit_humidity',
        'unit_temperature','unit_wind'
    ];

}
