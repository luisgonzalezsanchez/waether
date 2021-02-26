
@extends('layouts.app')
@section('javascript')
<script src="{{asset('js/dashboard/home.js') }}{{ '?time='.date("YmdHis") }}"></script>
@endsection
@section('content')
<div class="height-master ">
    <div class="my-padding">
        <div class="d-flex box-ini-dahs align-items-center">
            <h4 class="mx-4 titulo-table"><b><i class="icon-g-98"></i> BUSQUEDA DE CLIMA POR CIUDAD</B></b></h4>
        </div>

        
              <div class="">
            <div class="col-sm-12 col-md-12 col-lg-12">
                <div class="card">
                    <div class="card-header" style="position: relative">Búsqueda</div>
                    <div class="card-body">
                        <div class="row">
                            <!-- Componentes de busqueda segun tipo escogido en el select de busqueda -->
                            <div  class="my-2 col-md-4">
                                
                                <!--<search-name  v-on:update_name="updateName"></search-name>-->
                                <input
                                id="pac-input"
                                class="form-control" type="text" v-model="find.search"
                                placeholder="Ciudad a Buscar"
                                />
                            </div>
                            <!--<div class="my-2 col-md-2">
                                <form @submit.prevent='searchLocation'>
                                    <input class="btn btn-primary form-control" type="submit"  value="BUSCAR" >
                                </form>
                            </div>-->
                            <div class="my-2 col-md-2">
                                <input class="btn btn-success form-control" type="submit"  value="LIMPIAR" @click.prevent="cleanSearch">
                            </div>
                        </div>                        
                    </div>                    
                </div>                
                <div class="card" v-show="(viewmap)">
                    <div class="card-header" style="position: relative">Resultado</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="input-group my-2 col-md-4 d-flex flex-column">
                                <h4 class=""><b>País</b></h4>
                                <p>
                                    <b v-text="element.country"></b>
                                </p>
                            </div>
                            <div class="input-group my-2 col-md-4 d-flex flex-column">
                                <h4 class=""><b>Ciudad</b></h4>
                                <p>
                                    <b v-text="element.city"></b>
                                </p>
                            </div>
                            <div class="input-group my-2 col-md-4 d-flex flex-column">
                                <h4 class=""><b>Temperatura</b></h4>
                                <p>
                                    <b v-text="element.temperature"></b>
                                    <b v-text="element.information.temperature"></b>
                                </p>
                            </div>
                            <div class="input-group my-2 col-md-4 d-flex flex-column">
                                <h4 class=""><b>Temperatura Maxima</b></h4>
                                <p>
                                    <span v-text="element.temperature_max"></span><span v-text="element.information.temperature"></span>
                                </p>
                            </div>
                            <div class="input-group my-2 col-md-4 d-flex flex-column">
                                <h4 class=""><b>Temperatura Minima</b></h4>
                                <p>
                                    <span v-text="element.temperature_min"></span><span v-text="element.information.temperature"></span>
                                </p>
                            </div>                            
                            <div class="input-group my-2 col-md-4 d-flex flex-column">
                                <h4 class=""><b>Viento </b></h4>
                                <p>
                                    <span v-text="element.wind"></span> <span v-text="element.information.wind"></span>
                                </p>
                            </div>
                            <div class="input-group my-2 col-md-4 d-flex flex-column">
                                <h4 class=""><b>Direccion Viento</b></h4>
                                <p>
                                    <span v-text="element.wind_direction"></span>
                                </p>
                            </div>
                            <div class="input-group my-2 col-md-4 d-flex flex-column">
                                <h4 class=""><b>Humedad </b></h4>
                                <p>
                                    <span v-text="element.humidity"></span> <span v-text="element.information.humidity"></span>
                                </p>
                            </div>
                            <div class="input-group my-2 col-md-4 d-flex flex-column">
                                <h4 class=""><b>Observacion </b></h4>
                                <p>
                                    <p v-text="element.text"></p>
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-12 col-lg-6 mb-4 px-0 ">                                
                                <div id="map" style="width: 100%; height: 400px;"></div>
                            </div>
                        </div>                        
                    </div>
                </div>                
            </div>
            
        </div>
    </div>
</div>
@endsection

