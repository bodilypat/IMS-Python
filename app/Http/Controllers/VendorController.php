<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class VendorController extends Controller
{
    /**
     * Display a listing of the vendors.
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $vendors = Vendor::all(); // Retrieve all vendors
        return view('vendors.index', compact('vendors')); // Return view with vendors data
    }

    /**
     * Show the form for creating a new vendor.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('vendors.create'); // Return view for creating a new vendor
    }

    /**
     * Store a newly created vendor in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string|max:500',
        ]);

        // Create a new vendor with the validated data
        Vendor::create($validatedData);

        // Redirect to the vendors index page with a success message
        return Redirect::route('vendors.index')->with('success', 'Vendor created successfully.');
    }

    /**
     * Display the specified vendor.
     *
     * @param  \App\Models\Vendor  $vendor
     * @return \Illuminate\View\View
     */
    public function show(Vendor $vendor)
    {
        return view('vendors.show', compact('vendor')); // Return view with the specific vendor data
    }

    /**
     * Show the form for editing the specified vendor.
     *
     * @param  \App\Models\Vendor  $vendor
     * @return \Illuminate\View\View
     */
    public function edit(Vendor $vendor)
    {
        return view('vendors.edit', compact('vendor')); // Return view for editing the vendor
    }

    /**
     * Update the specified vendor in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Vendor  $vendor
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Vendor $vendor)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string|max:500',
        ]);

        // Update the vendor with the validated data
        $vendor->update($validatedData);

        // Redirect to the vendors index page with a success message
        return Redirect::route('vendors.index')->with('success', 'Vendor updated successfully.');
    }

    /**
     * Remove the specified vendor from storage.
     *
     * @param  \App\Models\Vendor  $vendor
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Vendor $vendor)
    {
        // Delete the vendor
        $vendor->delete();

        // Redirect to the vendors index page with a success message
        return Redirect::route('vendors.index')->with('success', 'Vendor deleted successfully.');
    }
}
