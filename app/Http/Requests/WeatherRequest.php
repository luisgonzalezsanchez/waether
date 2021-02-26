<?php

namespace App\Http\Requests;

use Illuminate\Http\Request;
use Validator;

class WeatherRequest {

    public static function create(Request $request) {
        
        $rules = [
            'country'=> 'required', 
            'city'=> 'required',
            'lat'=> 'required',
            'lng'=> 'required',
            'temperature_max'=> 'required',
            'temperature_min'=> 'required',
            'humidity'=> 'required',
            'temperature'=> 'required',
            'text'=> 'required',
            'wind'=> 'required',
            'wind_direction'=> 'required'            
        ];

        $messages = [
            'country.required' => 'El campo es requerido',
            'city.required' => 'El campo es requerido',
            'lat.required' => 'El campo es requerido',
            'lng.required' => 'El campo es requerido',
            'temperature_max.required' => 'El campo es requerido',
            'temperature_min.required' => 'El campo es requerido',
            'humidity.required' => 'El campo es requerido',
            'temperature.required' => 'El campo es requerido',
            'text.required' => 'El campo es requerido',
            'wind.required' => 'El campo es requerido',
            'wind_direction.required' => 'El campo es requerido',
        ];
        //Se almacena las validaciones que haya captado la clase Validator para poder manejarlas en esta variable
        $confirm = Validator::make($request->all(), $rules,$messages);

        //Verificar las validaciones con error
        return GenericRequest::validar($confirm);
    }

}
