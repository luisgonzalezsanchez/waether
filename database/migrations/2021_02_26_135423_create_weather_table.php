<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWeatherTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('weather', function (Blueprint $table) {
            $table->increments('id');
            $table->string('country')->default('');
            $table->string('city')->default('');
            $table->string('lat')->default('');
            $table->string('lng')->default('');
            $table->string('temperature_max')->default('');
            $table->string('temperature_min')->default('');
            $table->string('humidity')->default('');
            $table->string('temperature')->default('');
            $table->string('text')->default('');
            $table->string('wind')->default('');
            $table->string('wind_direction')->default('');
            $table->string('unit_humidity')->default('');
            $table->string('unit_temperature')->default('');
            $table->string('unit_wind')->default('');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('weather');
    }
}
