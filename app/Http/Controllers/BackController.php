<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Session;

use Illuminate\Foundation\Auth\AuthenticatesUsers;


class BackController extends Controller

{



    public function __construct()
    {
        $this->middleware('auth');
        
    }


    public function index()
    {

         return view('dashboard.dashboard');

    }

    public function routes($route)
    {

      $_route = explode('/', $route);
      $param = '';


      if(is_numeric($_route[count($_route)-1])){
        $param = $_route[count($_route)-1];
        $route = str_replace('/'.$_route[count($_route)-1], '', $route);
      }
      if(count($_route) >= 3)
      {
        $param = $_route[count($_route)-1];
        $route = str_replace('/'.$_route[count($_route)-1], '', $route);
      }

//    dd($route);
      //Enviar bearer token para adjuntarlo a headers de sesión
      return view('dashboard/'.$route, ['id' => $param,'token'=>session('token')]);
    }

    public function admin($route)
    {

      $_route = explode('/', $route);
      $param = '';


      if(is_numeric($_route[count($_route)-1])){
        $param = $_route[count($_route)-1];
        $route = str_replace('/'.$_route[count($_route)-1], '', $route);
      }
      if(count($_route) >= 3)
      {
        $param = $_route[count($_route)-1];
        $route = str_replace('/'.$_route[count($_route)-1], '', $route);
      }

//    dd($route);
      //Enviar bearer token para adjuntarlo a headers de sesión
      return view('admin/'.$route, ['id' => $param,'token'=>session('token')]);
    }

    public function routes2($route)
    {


     $_route = explode('/', $route);

      //Buscar ruta passwords para poder concatenar token enviado al email
      if(count($_route) >= 3){

        $sub_route = str_replace('/'.$_route[count($_route)-1], '', $route);

        if($sub_route == "passwords/reset"){
          //concatenar token
           return view('auth/'.$sub_route,['token_email' => $_route[count($_route)-1]]);

        }


      }

      if($route == 'register'){
          return view('auth/login');
      }

      return view('auth/'.$route,['token'=>session('token')]);


    }


}


