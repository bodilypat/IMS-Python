@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Purchase Details</h1>

    <!-- Purchase Information -->
    <div class="card">
        <div class="card-header">
            Purchase ID: {{ $purchase->id }}
        </div>
        <div class="card-body">
            <h5 class="card-title">Supplier: {{ $purchase->supplier->name }}</h5>
            <h5 class="card-title">Product: {{ $purchase->product->name }}</h5>

            <p class="card-text"><strong>Quantity:</strong> {{ $purchase->quantity }}</p>
            <p class="card-text"><strong>Total Price:</strong> ${{ number_format($purchase->total_price, 2) }}</p>
            <p class="card-text"><strong>Purchase Date:</strong> {{ $purchase->purchase_date->format('Y-m-d') }}</p>

            <!-- Edit Button -->
            <a href="{{ route('purchases.edit', $purchase->id) }}" class="btn btn-warning">Edit</a>

            <!-- Delete Button -->
            <form action="{{ route('purchases.destroy', $purchase->id) }}" method="POST" style="display:inline-block;">
                @csrf
                @method('DELETE')
                <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure you want to delete this purchase?')">Delete</button>
            </form>

            <!-- Back to List Button -->
            <a href="{{ route('purchases.index') }}" class="btn btn-secondary">Back to Purchases</a>
        </div>
    </div>
</div>
@endsection
