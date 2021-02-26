    <ul data-v-3738b722 class="c-sidebar-nav h-100 ps ps--active-y" style="position: relative;">
      <li class="c-sidebar-nav-item" data-v-3738b722="">
        <a href="{{ url('dashboard/home') }}" class="{{ (request()->is('dashboard/home*')) ? 'router-link-exact-active c-active c-sidebar-nav-link' : 'c-sidebar-nav-link' }}" target="_self">
        <!--<a href="{{ url('home') }}" class="{{ (request()->is('dashboard/home*')) ? 'router-link-exact-active c-active c-sidebar-nav-link' : 'c-sidebar-nav-link' }}" target="_self">-->
          <!--<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" class="c-sidebar-nav-icon"><path d="M19.955 6.67c-2.036-2.036-4.848-3.295-7.955-3.295-6.213 0-11.25 5.037-11.25 11.25 0 0 0 0 0 0v0 4.125h6.75v-1.5h-5.25v-2.625c0-5.376 4.374-9.75 9.75-9.75s9.75 4.374 9.75 9.75v2.625h-5.25v1.5h6.75v-4.125c0-0.009 0-0.020 0-0.031 0-3.097-1.26-5.9-3.295-7.924l-0-0z"></path><path d="M3.75 12.375h1.5v1.5h-1.5v-1.5z"></path><path d="M11.25 6h1.5v1.5h-1.5v-1.5z"></path><path d="M6.375 7.875h1.5v1.5h-1.5v-1.5z"></path><path d="M18.75 12.375h1.5v1.5h-1.5v-1.5z"></path><path d="M13.932 15.708l3.244-6.758-1.352-0.649-3.243 6.756c-0.177-0.037-0.379-0.058-0.587-0.058-1.66 0-3.007 1.346-3.007 3.007s1.346 3.007 3.007 3.007c1.66 0 3.007-1.346 3.007-3.007 0-0.92-0.413-1.743-1.063-2.294l-0.004-0.004zM12 19.5c-0.828 0-1.5-0.672-1.5-1.5s0.672-1.5 1.5-1.5c0.828 0 1.5 0.672 1.5 1.5v0c-0.001 0.828-0.672 1.499-1.5 1.5h-0z"></path></svg>-->
          <svg class="c-sidebar-nav-icon">
          <use xlink:href="{{ env('APP_URL', '') }}/icons/sprites/free.svg#cil-home"></use>
          </svg>
          Inicio </a>
      </li>
      <li class="c-sidebar-nav-item" >
        <a href="{{ url('dashboard/weather/index') }}" class="{{ (request()->is('dashboard/weather*')) ? 'router-link-exact-active c-active c-sidebar-nav-link' : 'c-sidebar-nav-link' }}" target="_self">
            <svg class="c-sidebar-nav-icon">
                <use xlink:href="{{ env('APP_URL', '') }}/icons/sprites/free.svg#cil-library"></use>
            </svg>Historial</a>
      </li>      
    </ul>


