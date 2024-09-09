<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\SaleItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class SaleController extends Controller
{
    /**
     * Display a listing of the sales.
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $sales = Sale::with('saleItems')->get(); // Retrieve all sales with related sale items
        return view('sales.index', compact('sales')); // Return view with sales data
    }

    /**
     * Show the form for creating a new sale.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('sales.create'); // Return view for creating a new sale
    }

    /**
     * Store a newly created sale in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'total_amount' => 'required|numeric|min:0',
            'status' => 'required|in:pending,completed,shipped,canceled',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
        ]);

        // Start a database transaction
        \DB::transaction(function () use ($validatedData) {
            // Create a new sale
            $sale = Sale::create([
                'total_amount' => $validatedData['total_amount'],
                'status' => $validatedData['status'],
            ]);

            // Create sale items
            foreach ($validatedData['items'] as $item) {
                $sale->saleItems()->create([
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);
            }
        });

        // Redirect to the sales index page with a success message
        return Redirect::route('sales.index')->with('success', 'Sale created successfully.');
    }

    /**
     * Display the specified sale.
     *
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\View\View
     */
    public function show(Sale $sale)
    {
        return view('sales.show', compact('sale')); // Return view with the specific sale data
    }

    /**
     * Show the form for editing the specified sale.
     *
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\View\View
     */
    public function edit(Sale $sale)
    {
        return view('sales.edit', compact('sale')); // Return view for editing the sale
    }

    /**
     * Update the specified sale in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Sale $sale)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'total_amount' => 'required|numeric|min:0',
            'status' => 'required|in:pending,completed,shipped,canceled',
        ]);

        // Update the sale
        $sale->update($validatedData);

        // Optionally update sale items
        // Handle this part according to your requirements

        // Redirect to the sales index page with a success message
        return Redirect::route('sales.index')->with('success', 'Sale updated successfully.');
    }

    /**
     * Remove the specified sale from storage.
     *
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Sale $sale)
    {
        // Delete the sale
        $sale->delete();

        // Redirect to the sales index page with a success message
        return Redirect::route('sales.index')->with('success', 'Sale deleted successfully.');
    }
}
