let mix = require('laravel-mix');
mix.js(['resources/js/global/generic.js'], 'public/js/global/').version()
    .js(['resources/js/dashboard/home.js'], 'public/js/dashboard/').version()
    .js(['resources/js/dashboard/device.js'], 'public/js/dashboard/').version()
    .js(['resources/js/dashboard/weather.js'], 'public/js/dashboard/').version()
    .js(['resources/js/auth/login.js'], 'public/js/auth/').version()