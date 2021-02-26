

# Instalacion

Siga estos pasos para instalar

Usuario por defecto : prueba@tiempo.test
Contraseña : prueba


> Configurar el archivo .env teniendo como ejemplo el .env.local

Comandos básicos al montar el proyecto

> composer install \
> php artisan key:generate

crear las tablas (esta opcion solo es cuando no se tenga acceso al servidor de la base de datos)
>php artisan migrate

Ejecutar los seeders
>php artisan db:seed

---

## Passport

Passport es la manera que se usa para validar las Autenticación del usuario, ya esta instalado en el proyecto, solo hace falta correr los siguientes comandos:

> php artisan migrate
>
> php artisan passport:install


## Api Google

Ingrese su Api de Google Maps en scripts.blade.php



## Api del tiempo

Se uso api.tutiempo.net 



