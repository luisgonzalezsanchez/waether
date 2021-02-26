<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use App\Http\Requests\CreateNewUser;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Libraries\Email;
use Illuminate\Validation\Rule;
use Validator;
use DateInterval;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
        //$this->middleware('auth:hub')->only('user','logout');
    }

    public function signup(Request $request)
    {
        //obtener las validaciones que arroje el request
        $confirm = CreateNewUser::validator($request);

        //Si hay errores arroja los que haya detectado previamente en la clase CreateNewUser
        if ($confirm) return response()->json($confirm);

        $user = new User([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => bcrypt($request->password),
           ]);
        $user->save();

        return response()->json([
            'status'=>'OK',
            'message' => '¡El Usuario ha sido creado!'
        ]);
    }

    public static function generateToken($user){
            $tokenResult = $user->createToken('Personal Access Token');
            $token = $tokenResult->token;
            $token->save();
            $user->access_token = $tokenResult->accessToken;
            $user->save();
    }

    public function login(Request $request)
    {

         $request->validate([
            'email'       => 'required|string|email',
            'password'    => 'required|string',
            'remember_me' => 'boolean',
        ]);


        $credentials = request(['email', 'password']);
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'status'=>'ERROR',
                'errors' => '¡Email o contraseña incorrectas, verifique nuevamente!'
            ]);
        }

        $user = $request->user();

        if($user->status == 'Inactive'){
            return response()->json([
                'status'=>'ERROR ',
                'errors'=>'El usuario está inhabilitado, consulte con el administrador',

            ]);
        }

        if($user->role_id == 1 || $user->role_id == 4 ){

            $tokenResult = $user->createToken('Personal Web Admin Token');
            $token = $tokenResult->token;
            if ($request->remember_me) {
                $token->expires_at = Carbon::now()->addWeeks(1);
            }
            $token->save();
            $user->access_token = $tokenResult->accessToken;
            $user->save();
            return response()->json([
                'status'=>'OK',
                'message'=>'Iniciando sesión...',
                'access_token' =>  $user->access_token,
                'token_type'   => 'Bearer',
                'expires_at'   => Carbon::parse(
                    $tokenResult->token->expires_at)
                        ->toDateTimeString(),
            ]);
        }

        else{


            return response()->json([
                'status'=>'ERROR ',
                'errors'=>'Acceso no autorizado, consulte con el administrador',

            ]);

        }
    }

    public function user()
    {
            //dd(\Auth::user());
            $user = \Auth::user();
            return response()->json([
                'status' =>'OK',
                'user' =>$user,
            ]);

    }

    public function logout(Request $request)
    {

            $request->user()->token()->revoke();
            return response()->json([
                'status' =>'OK',
                'message' =>'¡Se ha cerrado la sesión!'
            ]);

    }

     public function sendResetEmail(Request $request){

            //dd($request->all());
            $email = $request->email;
            $token = md5(date("YmdHis").rand ( 1000000 , 9999999));

            $user = User::select('id','name','remember_token')->where('email', $email)->get();

            if(count($user) == 0){
            return response()->json([
                    'status' =>'ERROR',
                    'errors' =>'El correo electrónico ingresado no se encuentra registrado'
                ]);
            }
            $user = $user[0];
            $user->remember_token = $token;
            $user->save();

            \DB::table('password_resets')->insert([
                'email' => $email,
                'token' => $token,
                'created_at'=>(date("YmdHis"))
            ]);

            $data = array();
            $data['to'] = $email;
            $data['name_to'] = $user->name;
            $data['subject'] = 'Reestablecimiento de contraseña';
            $data['html'] = '<p>Ha solicitado un restablecimiento de contraseña. Oprima el siguiente botón para continuar con el proceso</p>
            <a href="'.$request->host.'/auth/passwords/reset/'.$token.'">Reestablecer Contraseña</a>';

            //dd($data);
            Email::send_email($data);

           return response()->json([
                    'status' =>'OK',
                    'message' =>'Hemos enviado un mensaje a su correo electrónico'
                ]);
    }

     public function resetPass(Request $request){

        //dd($request->all());
        $email = $request->email;
        $token = $request->token;
        $user = User::select('id','remember_token')->where([['email', '=', $email] ])->get();
        if(count($user) == 0){
           return response()->json([
                    'status' =>'ERROR',
                    'errors' =>'El correo electrónico ingresado no se encuentra registrado'
                ]);
        }

        $user = $user[0];

        if($user->remember_token != $token){
           return response()->json([
                        'status' =>'ERROR',
                        'errors' =>'Este link ha caducado o no es valido para la recuperación de contraseña'
                    ]);
        }

        if($request->password != $request->password_confirmation){
             return response()->json([
                    'status' =>'ERROR',
                    'errors' =>'La confirmación de contraseña no coincide'
                ]);
         }

        if($request->password == $request->password_confirmation){
             $rules = ['password' => 'confirmed|min:6'];

              $messages = [
                'password.min'=>'La contraseña por lo menos deber tener 6 caracteres',
                'password.confirmed'=>'La confirmación de contraseña no coincide',
              ];

                $validator = Validator::make($request->all(), $rules, $messages);

                if ($validator->fails()) {
                    $errors = $validator->errors();

                   return response()->json([
                        'status'=>'ERROR',
                        'errors' => $errors
                  ]);
                }
            $user->password = bcrypt($request->password);
            $user->remember_token = 'N/A';
            $user->save();

             \DB::table('password_resets')->where('email','=',$email)->delete();

            return response()->json([
                    'status' =>'OK',
                    'message' =>'Ha reestablecido su contraseña. Por favor dirijase a iniciar sesión nuevamente.'
                ]);
        }else{
            return response()->json([
                    'status' =>'ERROR',
                    'errors' =>'Hubo un problema con el reestablecimiento de contraseña, por favor intente nuevamente'
                ]);
        }
    }

      public function changePass(Request $request){

        $user = User::find($request->user()->id);

        //dd($user);

        if($request->password != $request->password_confirmation){
             return response()->json([
                    'status' =>'ERROR',
                    'errors' =>'La confirmación de contraseña no coincide'
                ]);
         }

        if($request->password == $request->password_confirmation){
             $rules = ['password' => 'confirmed|min:6'];

              $messages = [
                'password.min'=>'La contraseña por lo menos deber tener 6 caracteres',
                'password.confirmed'=>'La confirmación de contraseña no coincide',
              ];

                $validator = Validator::make($request->all(), $rules, $messages);

                if ($validator->fails()) {
                    $errors = $validator->errors();

                   return response()->json([
                        'status'=>'ERROR',
                        'errors' => $errors
                  ]);
                }
            $user->password = bcrypt($request->password);
            $user->change_password = $request->change_password;
            $user->update();

            return response()->json([
                    'status' =>'OK',
                    'message' =>'La contraseña ha sido cambiada'
                ]);
        }else{
            return response()->json([
                    'status' =>'ERROR',
                    'errors' =>'Hubo un problema con el cambio de contraseña, por favor intente nuevamente'
                ]);
        }
    }

}
