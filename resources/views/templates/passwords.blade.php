<!--MODAL SUCCESS-->
<div class="modal fade " id="password" tabindex="-1" role="dialog" aria-labelledby="info-banners" aria-hidden="true"  data-backdrop="static" data-keyboard="false">
   <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="modal-header p-4">
            <h5 style="margin-bottom:0px; ">CAMBIO DE CONTRASEÑA </h5>
         </div>
         <div class="modal-body d-flex flex-column p-5 align-items-center justify-content-center">
             <form @submit.prevent="changePassword()">
                @csrf
                <p>Usted tiene asignada una contraseña generada por el sistema, deberá cambiarla para poder continuar.</p>
                <div class="form-group row">
                    <label for="password" class="col-md-12 col-form-label ">Contraseña</label>
                    <div class="col-md-12">
                        <input id="password" type="password" v-model="password.password" class="form-control" name="password" required>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="password-confirm" class="col-md-12 col-form-label">Confirmar contraseña</label>

                    <div class="col-md-12">
                        <input id="password-confirm" type="password" v-model="password.password_confirmation" class="form-control" name="password_confirmation" required>
                    </div>
                </div>
                <div class="d-flex justify-content-center">
                    <div class="form-group row mb-0">
                        <div class="col-md-12">
                            <button type="submit" class="btn btn-primary">
                                Cambiar Contraseña
                            </button>
                        </div>
                    </div>
                </div>    
            </form>
         </div>
      </div>
      <!-- /.modal-content -->
   </div>
   <!-- /.modal-dialog -->
</div>
<!--/. MODAL SUCCESS-->
