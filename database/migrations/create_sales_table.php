<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->foreignId('product_id')->constrained()->onDelete('cascade'); // Foreign key to products table
            $table->integer('quantity'); // Number of items sold
            $table->decimal('price', 10, 2); // Price per item
            $table->decimal('total', 10, 2); // Total sale amount (quantity * price)
            $table->unsignedBigInteger('customer_id')->nullable(); // Foreign key to customers table (if applicable)
            $table->timestamp('sold_at'); // Timestamp of when the sale occurred
            $table->timestamps(); // Created at and updated at timestamps

            // Optional: Adding indexes for better performance on foreign keys
            $table->index('product_id');
            $table->index('customer_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sales');
    }
}
