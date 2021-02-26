<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Http\Requests;

/**
 * Description of GenericRequest
 *
 * @author 1024511539
 */
class GenericRequest {

    public static function validar($confirm) {
        if ($confirm->fails()) {
            //retorna la variable errors con lo que haya encontrado Validator
            $errors = $confirm->errors();

            //este array contiene las validaciones que ha obtenido
            return [
                'status' => 'ERROR',
                'statusCode' => '101',
                'message' => 'Error en validación de campos',
                'errors' => $errors
            ];
        }
        // si no hay errores de validaciones deja pasar a las demas sentencias que tenga el controlador que la esta llamando
        return false;
    }

}
