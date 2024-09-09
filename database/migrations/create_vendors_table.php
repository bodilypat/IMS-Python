<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVendorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vendors', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('name'); // Vendor's name
            $table->string('contact_person')->nullable(); // Contact person at the vendor
            $table->string('email')->nullable(); // Email address of the vendor
            $table->string('phone')->nullable(); // Phone number of the vendor
            $table->text('address')->nullable(); // Address of the vendor
            $table->timestamps(); // Created at and updated at timestamps

            // Optional: Adding a unique index to the email field if required
            $table->unique('email');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vendors');
    }
}
