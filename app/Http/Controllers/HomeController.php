<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function home()
    {
    //    if(auth()->user()->hasRole('admin'))
        //{
            return view('/admin/home');
       // }
        //return view('/dashboard/home');

    }

    public function dashboard()
    {
        return view('/dashboard/home');
    }

    public function admin()
    {
        return view('/admin/home');
    }

    public function all(Request $request)
    {
      return  response()->json([
                'status' => 'OK',
                'message' => 'Bienvenido Administrador',

            ]);
    }
}
