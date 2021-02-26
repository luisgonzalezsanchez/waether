<?php

namespace App\Http\Controllers\api\v1\backend;

use App\Http\Controllers\Controller;
use App\Weather;
use Illuminate\Http\Request;

use App\Http\Requests\FindSearch;
use App\Http\Requests\WeatherRequest;

class WeatherController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $list = Weather::orderBy('id', 'ASC')->paginate(20);

        return response()->json([
            'list' => $list, 'status' => 'OK', 'pagination' => [
                'total' => $list->total(),
                'current_page' => $list->currentPage(),
                'per_page' => $list->perPage(),
                'last_page' => $list->lastPage(),
                'from' => $list->firstItem(),
                'to' => $list->lastPage()
            ]
        ]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        $validacion = WeatherRequest::create($request);

        $information = json_decode($request->information);

        if (!$validacion) {
           // DB::connection()->enableQueryLog();
           Weather::create([
            'country'=> $request->country, 
            'city'=> $request->city,
            'lat'=> $request->lat,
            'lng'=> $request->lng,
            'temperature_max'=> $request->temperature_max,
            'temperature_min'=> $request->temperature_min,
            'humidity'=> $request->humidity,
            'temperature'=> $request->temperature,
            'text'=> $request->text,
            'wind'=> $request->wind,
            'wind_direction'=> $request->wind_direction,
            'unit_humidity'=> $information->humidity,
            'unit_temperature'=> $information->temperature,
            'unit_wind'=> $information->wind
            ]);

//            $queries = DB::getQueryLog();
  //          dd($queries);
            return response()->json([
                'status' => 'OK',
                'message' => 'Se Creo exitosamente',
            ]);
        }
        return $validacion;
    }


    public function search(Request $request)
    {
        //obtener las validaciones que arroje el request
        $confirm = FindSearch::validator($request);

        //Si hay errores arroja los que haya detectado previamente en la clase CreateBanner
        if ($confirm)
            return response()->json($confirm);

        //concatenar el tipo de campo y busqueda que se necesita
        switch ($request->type_search) {
            case 'city':
                $conditionsRaw = $request->type_search . " LIKE  '%" . $request->search . "%'";
                break;
            default:
                $conditionsRaw = $request->type_search . "= '" . $request->search . "'";
                break;
        }

        $list = Weather::whereRaw($conditionsRaw)->orderBy('id', 'ASC')->paginate(20);

        //obtener el resultado de la busqueda
        if (isset($list) && count($list) > 0) {
            return response()->json([
                'list' => $list, 'status' => 'OK', 'pagination' => [
                    'total' => $list->total(),
                    'current_page' => $list->currentPage(),
                    'per_page' => $list->perPage(),
                    'last_page' => $list->lastPage(),
                    'from' => $list->firstItem(),
                    'to' => $list->lastPage()
                ]
            ]);
        } else {
            return response()->json([
                'status' => 'ERROR', 'errors' => 'No hay ningun resultado'
            ]);
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Device = Weather::find($id);

        if (!empty($Device)) {
            $Device->delete($id);
            return response()->json([
                'status' => 'OK',
                'message' => 'Se Elimino exitosamente',
            ]);
        } else {
            return response()->json([
                'status' => 'ERROR',
                'message' => 'No existe ese id',
            ]);
        }
    }
}
