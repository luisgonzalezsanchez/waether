<div class="card-body loading" style="background-color: rgba(255, 255, 255, 0.349);">
   <div class="sk-spinner sk-spinner-pulse"></div>
   <h4>Cargando...</h4>
</div>

<!-- Error en el proceso -->
<div class="modal fade" id="modal-error" tabindex="-1" role="dialog" aria-labelledby="info-banners" aria-hidden="true" style="z-index: 1000000">
    <div class="modal-dialog modal-dialog-centered" role="document">
       <div class="modal-content">
          <div class="modal-header p-4">
             <h5 style="margin-bottom:0px; ">Error en el proceso</h5>
             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
             <span aria-hidden="true">×</span>
             </button>
          </div>
          <div class="modal-body d-flex flex-column p-5 align-items-center justify-content-center">
             <i class="cil-x-circle icons " style="font-size: 80px; color: #e76b6b;"></i>
             <p class="text-center modal-error-message my-4"></p>
          </div>
       </div>
       <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
 </div>

<!-- Proceso exitoso -->
 <div class="modal fade " id="modal-exito" tabindex="-1" role="dialog" aria-labelledby="info-banners" aria-hidden="true" style="z-index: 1000000">
    <div class="modal-dialog modal-dialog-centered" role="document">
       <div class="modal-content">
          <div class="modal-header p-4">
             <h5 style="margin-bottom:0px; ">Proceso exitoso </h5>
             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
             <span aria-hidden="true">×</span>
             </button>
          </div>
          <div class="modal-body d-flex flex-column p-5 align-items-center justify-content-center">
             <i class="cil-check icons" style="font-size: 80px; color: #8BC34A;"></i>
             <p class="text-center modal-exito-message my-4"></p>
          </div>
       </div>
       <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
 </div>
