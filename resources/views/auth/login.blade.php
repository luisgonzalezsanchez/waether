@extends('layouts.authBase')
@section('javascript')
  <script src="{{asset('js/auth/login.js') }}{{ '?time='.date("YmdHis") }}"></script>
@endsection

@section('content')



    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <div class="card-group">
            <div class="card p-4">
              <div class="card-body">

                <br>
                <form method="POST" action="{{ route('login') }}">
                    @csrf
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">

                        <div class="icon-box-my-login">
                        <svg class="icon-box-my-login-i">
                            <use xlink:href="/icons/sprites/user.svg#userlogin"></use>
                        </svg>
                        </div>

                        </span>
                    </div>
                    <input class="form-control" type="text" placeholder="Email" name="email" value="{{ old('email') }}" required autofocus>
                    @error('email')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                    </div>
                    <div class="input-group mb-4">
                    <div class="input-group-prepend">
                        <span class="input-group-text">

                        <div class="icon-box-my-login">
                        <svg class="icon-box-my-login-i">
                            <use xlink:href="/icons/sprites/password.svg#password"></use>
                        </svg>
                        </div>


                        </span>
                    </div>
                    <input class="form-control" type="password" placeholder="Password" name="password" required>
                    @error('password')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                    </div>
                    <div class="row justify-content-center">

                        <button class="btn btn-primary px-4 btn-my-login" type="submit">{{ __('Iniciar') }}</button>

                    </form>
                    <!--<div class="col-6 text-right">
                        <a href="{{ url('/auth/passwords/email') }}" class="btn btn-link px-0" type="button">{{ __('Olvido su contraseña?') }}</a>
                    </div>-->
                    </div>
              </div>
            </div>
            <!--<div class="card text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <div class="card-body text-center">
                <div>
                  <h2>Connect</h2>
                  <br>
                  <p>
                      Inicie sesion para gestionar la informacion de los dispositivos
                  </p>
                  @if (Route::has('password.request'))
                    <a href="{{ route('register') }}" class="btn btn-primary active mt-3" type="button">{{ __('Register') }}</a>
                  @endif

                </div>
              </div>
            </div>-->

          </div>
        </div>
      </div>
    </div>

@endsection

@section('javascript')

@endsection
