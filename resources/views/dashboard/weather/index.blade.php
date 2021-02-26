
@extends('layouts.app')
@section('javascript')
<script src="{{asset('js/dashboard/weather.js') }}{{ '?time='.date("YmdHis") }}"></script>
@endsection
@section('content')
<div class="height-master ">
    <div class="my-padding">
        <div class="d-flex box-ini-dahs align-items-center">
            <h4 class="mx-4 titulo-table"><b><i class="icon-g-98"></i> Historial</b></h4>
        </div>

        {{-- <img src="{{ config('app.source_api').'/storage/app/banners/8f5fd83637ed3cc527ccd61a1ac91541668971.jpeg' }}" > --}}
              <!--table mantenimientos desktop-->
              <div class="">
            <div class="col-sm-12 col-md-12 col-lg-12">
                <div class="card">
                    <div class="card-header" style="position: relative">Búsqueda</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="my-2 col-md-4">
                                <select class="form-control my-select" style="border: 1px solid rgb(209, 212, 215);" v-model="find.type_search" v-on:change="cleanFind">
                                    <option value= 0 selected>Buscar por..</option>
                                    <option value="city">Ciudad</option>
                                </select>
                            </div>
                            <!-- Componentes de busqueda segun tipo escogido en el select de busqueda -->
                            <div  class="my-2 col-md-4">
                                <search-city  v-if="find.type_search == 'city'" v-on:update_city="updateCity"></search-city>
                            </div>
                            <div class="my-2 col-md-2">
                                <form @submit.prevent='getListSearch'>
                                    <input class="btn btn-primary form-control" type="submit"  value="BUSCAR" >
                                </form>
                            </div>
                            <div class="my-2 col-md-2">
                                <input class="btn btn-success form-control" type="submit"  value="LIMPIAR" @click.prevent="cleanSearch">
                            </div>
                        </div>
                        <div class="row" v-if="find.active != false">
                            <div class="my-2 col-md-12">
                                <p> Se han encontrado <strong v-text="pagination.total"></strong> coincidencia(s)</p>
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table table-striped table-bordered datatable bg-marca" >
                    <thead>
                        <tr>
                            <th>Pais</th>
                            <th class="table-cell">Ciudad</th>
                            <th class="table-cell">Temperatura</th>
                            <th class="table-cell">Fecha Creacion</th>
                            <th class="table-cell">Fecha Modificacion</th>
                            <th>Borrar</th>
                            <th>Ver</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="reg in list">

                            <td v-text="reg.country"></td>
                            <td class="este2 table-cell" v-text="reg.city"></td>
                            <td class="este2 table-cell" v-text="reg.temperature+' '+ reg.unit_temperature"></td>
                            <td class="este2 table-cell" v-text="date_format(reg.created_at,'YYYY-MM-DD HH:mm:ss')"></td>
                            <td class="este2 table-cell" v-text="date_format(reg.updated_at,'YYYY-MM-DD HH:mm:ss')"></td>
                            <td>
                                <a class="btn btn-danger" href="" @click.prevent="deleteElement(reg)">
                                    <svg class="c-icon">
                                    <use xlink:href="{{ env('APP_URL', '') }}/icons/sprites/free.svg#cil-trash"></use>
                                    </svg></a>
                            </td>
                            <td>

                                <a class="btn btn-success" href=""  @click.prevent="viewElement(reg)">
                                    <svg class="c-icon">
                                    <use xlink:href="{{ env('APP_URL', '') }}/icons/sprites/free.svg#cil-magnifying-glass"></use>
                                    </svg>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="dataTables_wrapper dt-bootstrap4 no-footer">
                <div class="row">
                    <div class="col-sm-12 col-md-5 box-txt-register">
                        <div class="dataTables_info resultados-m-txt" id="vehicle-list_info" role="status" aria-live="polite"
                             v-text="'Mostrando registros del '+pagination.from+' al '+lastShowElement+' de un total de '+pagination.total+' registros'"
                             ></div>
                    </div>
                    <div class="col-sm-12 col-md-7">
                        <div class="dataTables_paginate paging_simple_numbers" id="vehicle-list_paginate">
                            <ul class="pagination">
                                <li  v-if="pagination.current_page > offset" class="paginate_button page-item">
                                    <a class="page-link" @click.prevent="firstPage"  aria-controls="vehicle-list"  tabindex="0">
                                        Primero
                                    </a>
                                </li>
                                <li class="paginate_button page-item previous"
                                    id="vehicle-list_previous"
                                    v-if="pagination.current_page > 1"
                                    >
                                    <a href="#" @click.prevent="changePage(pagination.current_page-1)" aria-controls="vehicle-list"  tabindex="1" class="page-link"><<</a>
                                </li>
                                <li class="paginate_button page-item"
                                    v-for="page in pagesNumber" v-bind:class="[page == isActived ? 'active' :'' ]">
                                    <a href="#" aria-controls="vehicle-list" data-dt-idx="page" tabindex="1" class="page-link" v-text="page"  @click.prevent="changePage(page)"></a>
                                </li>
                                <li class="paginate_button page-item next" id="vehicle-list_next"
                                    v-if="pagination.current_page < pagination.last_page">
                                    <a href="#" aria-controls="vehicle-list"  tabindex="1" class="page-link"
                                       @click.prevent="changePage(pagination.current_page+1)"
                                       >>></a>
                                </li>
                                <li  href="#" v-if="pagination.current_page > offset" class="paginate_button page-item"  >
                                    <a class="page-link"  @click.prevent="lastPage" aria-controls="vehicle-list"  tabindex="1">
                                        Ultimo
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!--table mantenimientos mobile-->
        </div>
    </div>   
    
    
    <!--modal ver-->
    <div class="modal fade" id="ver-detalle" tabindex="-1" role="dialog" aria-labelledby="info-banners" aria-hidden="true">
        <div class="modal-dialog  modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header p-4">
                    <h3 class="modal-title" style="line-height: 1;"><b> VER DETALLE</b></h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body d-flex flex-column p-4">
                    <div class="m-2 row  ">
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
                                <b v-text="element.unit_temperature"></b>
                            </p>
                        </div>
                        <div class="input-group my-2 col-md-4 d-flex flex-column">
                            <h4 class=""><b>Temperatura Maxima</b></h4>
                            <p>
                                <span v-text="element.temperature_max"></span><span v-text="element.unit_temperature"></span>
                            </p>
                        </div>
                        <div class="input-group my-2 col-md-4 d-flex flex-column">
                            <h4 class=""><b>Temperatura Minima</b></h4>
                            <p>
                                <span v-text="element.temperature_min"></span><span v-text="element.unit_temperature"></span>
                            </p>
                        </div>                            
                        <div class="input-group my-2 col-md-4 d-flex flex-column">
                            <h4 class=""><b>Viento </b></h4>
                            <p>
                                <span v-text="element.wind"></span> <span v-text="element.unit_wind"></span>
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
                                <span v-text="element.humidity"></span> <span v-text="element.unit_humidity"></span>
                            </p>
                        </div>
                        <div class="input-group my-2 col-md-4 d-flex flex-column">
                            <h4 class=""><b>Observacion </b></h4>
                            <p>
                                <p v-text="element.text"></p>
                            </p>
                        </div>
                        <div class="input-group my-2 col-md-4 d-flex flex-column">
                            <h4 class=""><b>Fecha </b></h4>
                            <p>
                                <p v-text="date_format(element.created_at,'YYYY-MM-DD HH:mm:ss')"></p>
                            </p>
                        </div>


                    </div>
                    <div class="row">
                        <div class="col-xl-12 col-lg-6 mb-4 px-0 ">                                
                            <div id="map_detalle" style="width: 100%; height: 400px;"></div>
                        </div>
                    </div>
                </div>
            <div class="modal-footer p-4 d-flex flex-my-column justify-content-center">

                    <input class="btn btn-primary" value="Cerrar" type="button" @click.prevent="closeModal('#ver-detalle')">
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!--modal ver-->

    <!--modal tabla confirmar eliminar recordatorio-->
    <div class="modal fade" id="delete-elemnt" tabindex="-2" role="dialog" aria-labelledby="info-banners" aria-hidden="true">
        <div class="modal-dialog  modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header p-4">
                    <h3 class="modal-title" style="line-height: 1;"><b>¿Esta seguro de borrar este registro?</b></h3>
                </div>
                <div class="modal-footer p-4 d-flex aling-items justify-content-between">
                    <a href="#" @click.prevent="closeModal('#delete-elemnt')" class="btn btn-primary">Cancelar</a>
                    <a href="#" @click.prevent="confirmDeleteElement(elementDelete)" class="btn btn-outline-success">Aceptar</a>
                    </form>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!--modal tabla confirmar eliminar recordatorio-->
@endsection
