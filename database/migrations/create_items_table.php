<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('name'); // Name of the item
            $table->text('description')->nullable(); // Description of the item (nullable)
            $table->integer('quantity')->default(0); // Quantity of the item in stock
            $table->decimal('price', 10, 2); // Price per item
            $table->decimal('cost', 10, 2); // Cost per item
            $table->unsignedBigInteger('vendor_id')->nullable(); // Foreign key to vendors table
            $table->timestamps(); // Created at and updated at timestamps

            // Optional: Adding indexes for better performance on foreign keys
            $table->index('vendor_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items');
    }
}
