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
        Schema::create('content_completed_playback_logs', function (Blueprint $table) {
            $table->id();
            $table->integer('id_user')->index();
            $table->integer('id_content')->index();
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
        Schema::table('content_completed_playback_logs', function (Blueprint $table) {
            //
        });
    }
};
