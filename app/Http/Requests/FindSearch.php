<?php

namespace App\Http\Requests;

use Illuminate\Http\Request;

use Validator;

class FindSearch
{
  //Validaciones para confirmar la verificacion de criterios de búsqueda, se declara de manera estática la función para poder acceder

    public static function  validator(Request $request){
       //Verificar que se este buscando algún criterio
      switch ($request->type_search) {
          case '':
            $rules = [
                'type_search'=>'required|not_in:0',
                'search'=> 'required',
              ];
            $messages =[
                'type_search.required' => 'Es necesario que especifique el tipo de búsqueda',
                'type_search.not_in' => 'Escoja el tipo de búsqueda',
                'search.required' => 'Es necesario que indique un criterio de busqueda',
             ];
          break;
          case 'city':
            $rules = [
                'type_search'=>'required',
                'search'=> 'required',
              ];
            $messages =[
                'type_search.required' => 'Es necesario que especifique el tipo de búsqueda',
                'type_search.not_in' => 'Escoja el tipo de búsqueda',
                'search.required' => 'Es necesario digite un criterio de búsqueda',
             ];
          break;   
                  
        }

        //Se almacena las validaciones que haya captado la clase Validator para poder manejarlas en esta variable
        $confirm = Validator::make($request->all(), $rules, $messages);

        //Verificar las validaciones con error
        if($confirm->fails())
        {
          //retorna la variable errors con lo que haya encontrado Validator
           $errors=$confirm->errors();

           //este array contiene las validaciones que ha obtenido
            return [
                  'status'=>'ERROR',
                  'message' => '',
                  'errors' => $errors

              ];
        }
        // si no hay errores de validaciones deja pasar a las demas sentencias que tenga el controlador que la esta llamando
         return false;
    }
}
