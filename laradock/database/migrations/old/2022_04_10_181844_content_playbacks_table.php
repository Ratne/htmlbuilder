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
        Schema::table('content_playbacks', function (Blueprint $table) {
            $table->tinyInteger('is_notified_category')->default(0)->index();
            $table->tinyInteger('is_notified_subcategory')->default(0)->index();
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
