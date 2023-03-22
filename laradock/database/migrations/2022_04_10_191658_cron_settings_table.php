<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cron_settings', function (Blueprint $table) {
            $table->integer('id',true);
            $table->string('key')->nullable(true)->default(null)->index();
            $table->string('value')->nullable(true)->default(null)->index();
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
        Schema::table('cron_settings', function (Blueprint $table) {
            //
        });
    }
};
