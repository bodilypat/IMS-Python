<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Category;
use App\Models\Supplier;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function index()
    {
        $items = Item::with('category', 'supplier')->get();
        return view('items.index', compact('items'));
    }

    public function create()
    {
        $categories = Category::all();
        $suppliers = Supplier::all();
        return view('items.create', compact('categories', 'suppliers'));
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'supplier_id' => 'required|exists:suppliers,id',
        ]);

        Item::create($validatedData);
        return redirect()->route('items.index')->with('success', 'Item created successfully!');
    }

    public function show(Item $item)
    {
        return view('items.show', compact('item'));
    }

    public function edit(Item $item)
    {
        $categories = Category::all();
        $suppliers = Supplier::all();
        return view('items.edit', compact('item', 'categories', 'suppliers'));
    }

    public function update(Request $request, Item $item)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'supplier_id' => 'required|exists:suppliers,id',
        ]);

        $item->update($validatedData);
        return redirect()->route('items.index')->with('success', 'Item updated successfully!');
    }

    public function destroy(Item $item)
    {
        $item->delete();
        return redirect()->route('items.index')->with('success', 'Item deleted successfully!');
    }
}
