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
        Schema::create('has_pages', function (Blueprint $table) {
            $table->bigInteger('page_id')->index()->default(0);
            $table->bigInteger('object_id')->index()->default(0);
            $table->string('type',191)->default(null)->nullable(true)->index();
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
        Schema::table('has_pages', function (Blueprint $table) {
            //
        });
    }
};
