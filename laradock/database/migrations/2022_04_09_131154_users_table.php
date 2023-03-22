<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name',191)->default(null)->nullable(false);
            $table->string('email',191)->default(null)->nullable(false)->unique();
            $table->timestamp('email_verified_at')->nullable(true)->default(null);
            $table->string('password',191)->nullable(false)->default(null);
            $table->date('dob')->nullable(false)->default(null);
            $table->string('avatar',100)->nullable(false)->default('images/avatar-1.jpg');
            $table->string('remember_token',100)->nullable(true)->default(null);
            $table->enum('user_type', [
                'admin',
                'user'
            ])
            ->default('user')
            ->index();
            $table->tinyInteger('enabled')->default(1)->index()->nullable(false);
            $table->string('firstname',191)->default(null)->nullable(false);
            $table->string('lastname',191)->default(null)->nullable(false);
            $table->tinyInteger('enabled_notifications')->default(1)->nullable(false)->index();
            $table->tinyInteger('enabled_stats')->default(1)->nullable(false)->index();
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
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
