

    <div class="c-wrapper">
      <header class="c-header c-header-light c-header-fixed c-header-with-subheader">
        <button class="c-header-toggler c-class-toggler d-lg-none mr-auto" type="button" data-target="#sidebar" data-class="c-sidebar-show"><span class="c-header-toggler-icon"></span></button><a class="c-header-brand d-sm-none" href="#"><img class="c-header-brand" src="{{ env('APP_URL', '') }}/assets/brand/coreui-base.svg" width="97" height="46" alt="CoreUI Logo"></a>
        <button class="c-header-toggler c-class-toggler ml-3 d-md-down-none" type="button" data-target="#sidebar" data-class="c-sidebar-lg-show" responsive="true"><span class="c-header-toggler-icon"></span></button>
        <?php
            use App\MenuBuilder\FreelyPositionedMenus;
            if(isset($appMenus['top menu'])){
                FreelyPositionedMenus::render( $appMenus['top menu'] , 'c-header-', 'd-md-down-none');
            }
        ?>

        <ul class="c-header-nav ml-auto mr-4">
          <li><h5 class="text-muted ml-4 mb-0 desktop "><span  v-text="user.name" style="font-weight: bold; margin-left: 6px;"></span></h5></li>
         
          <li class="c-header-nav-item d-md-down-none mx-2"><a class="c-header-nav-link">
            <a class="c-header-nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                <div class="c-avatar"><img class="c-avatar-img" src="{{ env('APP_URL', '') }}/img-front/icono-perfil-b.png" alt="user@email.com"></div>
            </a>
            <div class="dropdown-menu dropdown-menu-right pt-0">
              <div class="dropdown-header bg-light py-2"><strong>Account</strong></div>

              <a class="dropdown-item" href="">
                <svg class="c-icon mr-2">
                  <use xlink:href="{{ env('APP_URL', '') }}/icons/sprites/free.svg#cil-contact"></use>
                </svg> <span class="badge  ml-auto"  v-text="user.name"></span>
              </a>
              <a class="dropdown-item" href="">
                <svg class="c-icon mr-2">
                  <use xlink:href="{{ env('APP_URL', '') }}/icons/sprites/free.svg#cil-envelope-closed"></use>
                </svg> <span class="badge  ml-auto"  v-text="user.email"></span>
              </a>

              <a class="dropdown-item" href="#">
                
                <form action="/logout" method="POST"> @csrf <button type="submit" class="btn_logout-my btn btn-ghost-dark btn-block"><svg class="c-icon mr-2">
                  <use xlink:href="{{ env('APP_URL', '') }}/icons/sprites/free.svg#cil-account-logout"></use>
                </svg> Logout</button></form>
              </a>

              
            </div>
          </li>
          <li class="c-header-nav-item dropdown border-left" style="display: none;">

            <a class="c-header-nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
              <div class="c-avatar"><img class="c-avatar-img" src="{{ env('APP_URL', '') }}/img-front/icono-perfil-b.png" alt="user@email.com"></div>
            </a>
            <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg pt-0">
                <div class="dropdown-header bg-light"><strong>Aplicaciones</strong></div>

                <div class="small">
                <div class="row">

                  

                    



                </div>
                </div>

                <a class="dropdown-item" href="#">
                    <div class="message">
                    <div class="py-3 mfe-3 float-left">
                    <div class="c-avatar"><img class="c-avatar-img" src="{{ env('APP_URL', '') }}/assets/img/sobre.jpg" alt="user@email.com"><span class="c-avatar-status bg-success"></span></div>
                    </div>
                    <div><small class="text-muted">John Doe</small><small class="text-muted float-right mt-1">Just now</small></div>
                    <div class="text-truncate font-weight-bold"><span class="text-danger">!</span> Important message</div>
                    <div class="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</div>
                    </div>
                </a><a class="dropdown-item" href="#">

               
                </a><a class="dropdown-item text-center border-top" href="#"><strong>View all messages</strong></a>

            </div>
            
          </li>
        </ul>
    </header>
