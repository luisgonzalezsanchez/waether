
@extends('layouts.app')

@section('content')

    @if (session('status'))
        <div class="alert alert-success" role="alert">
            {{ session("status") }}
        </div>
    @endif        
<my-thoughts-component></my-thoughts-component>
@endsection
