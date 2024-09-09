<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchasesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('purchases', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->foreignId('product_id')->constrained()->onDelete('cascade'); // Foreign key to products table
            $table->integer('quantity'); // Number of items purchased
            $table->decimal('cost', 10, 2); // Cost per item
            $table->decimal('total', 10, 2); // Total cost (quantity * cost)
            $table->unsignedBigInteger('supplier_id')->nullable(); // Foreign key to suppliers table (if applicable)
            $table->timestamp('purchased_at'); // Timestamp of when the purchase occurred
            $table->timestamps(); // Created at and updated at timestamps

            // Optional: Adding indexes for better performance on foreign keys
            $table->index('product_id');
            $table->index('supplier_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('purchases');
    }
}
