<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use App\Models\PurchaseItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class PurchaseController extends Controller
{
    /**
     * Display a listing of the purchases.
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $purchases = Purchase::with('purchaseItems')->get(); // Retrieve all purchases with related purchase items
        return view('purchases.index', compact('purchases')); // Return view with purchases data
    }

    /**
     * Show the form for creating a new purchase.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('purchases.create'); // Return view for creating a new purchase
    }

    /**
     * Store a newly created purchase in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'total_amount' => 'required|numeric|min:0',
            'status' => 'required|in:pending,completed,canceled',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
        ]);

        // Start a database transaction
        \DB::transaction(function () use ($validatedData) {
            // Create a new purchase
            $purchase = Purchase::create([
                'total_amount' => $validatedData['total_amount'],
                'status' => $validatedData['status'],
            ]);

            // Create purchase items
            foreach ($validatedData['items'] as $item) {
                $purchase->purchaseItems()->create([
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);
            }
        });

        // Redirect to the purchases index page with a success message
        return Redirect::route('purchases.index')->with('success', 'Purchase created successfully.');
    }

    /**
     * Display the specified purchase.
     *
     * @param  \App\Models\Purchase  $purchase
     * @return \Illuminate\View\View
     */
    public function show(Purchase $purchase)
    {
        return view('purchases.show', compact('purchase')); // Return view with the specific purchase data
    }

    /**
     * Show the form for editing the specified purchase.
     *
     * @param  \App\Models\Purchase  $purchase
     * @return \Illuminate\View\View
     */
    public function edit(Purchase $purchase)
    {
        return view('purchases.edit', compact('purchase')); // Return view for editing the purchase
    }

    /**
     * Update the specified purchase in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Purchase  $purchase
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Purchase $purchase)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'total_amount' => 'required|numeric|min:0',
            'status' => 'required|in:pending,completed,canceled',
        ]);

        // Update the purchase
        $purchase->update($validatedData);

        // Optionally update purchase items
        // Handle this part according to your requirements

        // Redirect to the purchases index page with a success message
        return Redirect::route('purchases.index')->with('success', 'Purchase updated successfully.');
    }

    /**
     * Remove the specified purchase from storage.
     *
     * @param  \App\Models\Purchase  $purchase
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Purchase $purchase)
    {
        // Delete the purchase
        $purchase->delete();

        // Redirect to the purchases index page with a success message
        return Redirect::route('purchases.index')->with('success', 'Purchase deleted successfully.');
    }
}
