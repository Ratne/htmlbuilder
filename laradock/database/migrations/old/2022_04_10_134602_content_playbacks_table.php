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
        Schema::create('content_playbacks', function (Blueprint $table) {
            $table->integer('id',true);
            $table->integer('id_content')->default(0)->index();
            $table->integer('id_user')->default(0)->index();
            $table->integer('time')->default(0)->index();
            $table->tinyInteger('is_completed')->default(0)->index();
            $table->tinyInteger('is_notified')->default(0)->index();
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
        Schema::table('content_playbacks', function (Blueprint $table) {
            //
        });
    }
};
