<?php

namespace App\Utilities;

use App\Libraries\Email;
use Illuminate\Support\Facades\Log;


use Illuminate\Support\Facades\DB;

/**
 * Description of helpers
 *
 * @author 1024511539
 */
class helpers
{

  //generales
  static $success = 'Se ha completado exitosamente';
  static $error = 'Se ha presentado un error';
  static $not_result = 'No se ha encontrado ningun resultado';
  static $field_empty = 'Campo vacio';
  static $ws_success = 'Se ha procesado la solicitud';
  static $ws_error = 'No se ha podido procesar la solicitud';
  static $ws_error_exist_request = 'No se ha procesado la solicitud, hay una en curso';
  static $ws_connection = 'No hay comunicación , intente más tarde';
  static $user_inactive = "El usuario se encuentra inhabilitado, consulte con el administrador";
  static $user_registered = "El usuario ha sido registrado exitosamente";
  static $user_active = "Usuario en sesión";
  static $user_registered_Email = "El usuario está registrado, Mensaje de registro ha sido enviado al email";
  // List of codes Response
  const emptyocontent = 100;  //Cuerpo de la petición vacío / No Content-Type
  const errorvalidate = 101;  //Error validacion del campo
  const user_inactive_code = 102; //Usuario inactivo
  const fail_auth = 103;  //Error Autenticación
  const error_web_service = 104;  //Error conexión de servicio o web_service
  const noallowed = 105;  //Proceso no permitido
  const error_saving = 106; //No se pudo almacenar
  const error_db_handled = 201; //Errores controlados en programación en base de datos
  const error_services_av = 202;  //Error conexión de servicio asistente virtual
  const error_db = 300; //Errores de programación en base de datos
  const error_processing_data = 320;  //Error de decodificado y grabado de imagenes
  const error_general = 400;  //Error desconocido
  const error_sms_visible = 600;  //Error proveedor sms visibles
  const error_sms_no_visible = 601; //Error proveedor sms no visibles
  const complete_process = 0; //Petición exitosa
  const nofound = 404; //No se ha encontrada el contenido buscado
 
  

  static function errorResponseJsonDB($ex)
  {
    Log::error('Error DB-->>' . $ex->getMessage());
    return response()->json([
      'status' => 'ERROR',
      'statusCode' => helpers::error_db,
      'message' => $ex->getMessage(),
      'data' => ''
    ]);
  }
  /**
   * Create a new JSON response.
   * @param  string|array $message
   * @param  string|array|object  $data
   * @param  string  $status
   * @param  int  $statusCode
   */
  static function ResponseJson($message, $data = [], $status = 'OK', $statusCode = helpers::complete_process)
  {
    return response()->json([
      'status' => $status,
      'statusCode' => $statusCode,
      'message' => $message,
      'data' => $data
    ]);
  }

  static function httpPost($url, $data)
  {
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($curl);
    curl_close($curl);
    return $response;
  }
  

  static function httpPostJson($url, $data)
  {
    $curl = curl_init($url);
    $send_push = json_encode($data);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $send_push);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($curl);
    curl_close($curl);
    return $response;
  }

  //Emular navegador con petición GET
  static function httpGet($url)
  {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $output = curl_exec($ch);
    curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_exec($ch);
    curl_close($ch);
    return $output;
  }

  public static function cleanString($string)
  {
    $string = trim($string);

    $string = str_replace(
      array('à', 'ä', 'â', 'ª', 'Á', 'À', 'Â', 'Ä', 'á'),
      array('a', 'a', 'a', 'a', 'A', 'A', 'A', 'A', 'a'),
      $string
    );

    $string = str_replace(
      array('è', 'ë', 'ê', 'É', 'È', 'Ê', 'Ë', 'é'),
      array('e', 'e', 'e', 'E', 'E', 'E', 'E', 'e'),
      $string
    );

    $string = str_replace(
      array('ì', 'ï', 'î', 'Í', 'Ì', 'Ï', 'Î', 'í'),
      array('i', 'i', 'i', 'I', 'I', 'I', 'I', 'i'),
      $string
    );

    $string = str_replace(
      array('ò', 'ö', 'ô', 'Ó', 'Ò', 'Ö', 'Ô', 'ó'),
      array('o', 'o', 'o', 'O', 'O', 'O', 'O', 'o'),
      $string
    );

    $string = str_replace(
      array('ù', 'ü', 'û', 'Ú', 'Ù', 'Û', 'Ü', 'ú'),
      array('u', 'u', 'u', 'U', 'U', 'U', 'U', 'u'),
      $string
    );


    $string = str_replace(
      array('ñ', 'Ñ', 'ç', 'Ç'),
      array('n', 'N', 'c', 'C',),
      $string
    );


    //Esta parte se encarga de eliminar cualquier caracter extraño
    $string = str_replace(
      array("¨", "º", "`", "¨", "´",),
      '',
      $string
    );

    return $string;
  }

  
}
