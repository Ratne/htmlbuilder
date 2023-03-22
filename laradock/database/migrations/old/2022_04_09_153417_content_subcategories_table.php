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
        Schema::create('content_subcategories', function (Blueprint $table) {
            $table->integer('id',true);
            $table->integer('id_category')->default(0)->index();
            $table->string('name');
            $table->string('image')->nullable(true)->default(null);
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
        Schema::table('content_subategories', function (Blueprint $table) {
            //
        });
    }
};
