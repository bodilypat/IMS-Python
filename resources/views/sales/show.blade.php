<!DOCTYPE html>
<html>
<head>
    <title>Sale Details</title>
    <!-- Add any CSS or JS links here -->
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>
    <div class="container">
        <h1>Sale Details</h1>

        <!-- Display sale details -->
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">Sale #{{ $sale->id }}</h2>

                <p><strong>Customer:</strong> {{ $sale->customer->name }}</p>
                <p><strong>Item:</strong> {{ $sale->item->name }}</p>
                <p><strong>Quantity:</strong> {{ $sale->quantity }}</p>
                <p><strong>Price per Item:</strong> ${{ number_format($sale->price, 2) }}</p>
                <p><strong>Total:</strong> ${{ number_format($sale->quantity * $sale->price, 2) }}</p>
                <p><strong>Date:</strong> {{ $sale->created_at->format('Y-m-d') }}</p>
            </div>
        </div>

        <!-- Action buttons -->
        <div class="mt-3">
            <a href="{{ route('sales.edit', $sale->id) }}" class="btn btn-warning">Edit Sale</a>
            
            <form action="{{ route('sales.destroy', $sale->id) }}" method="POST" style="display:inline;">
                @csrf
                @method('DELETE')
                <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure you want to delete this sale?')">Delete Sale</button>
            </form>

            <!-- Link to go back to the sales list -->
            <a href="{{ route('sales.index') }}" class="btn btn-secondary mt-3">Back to List</a>
        </div>
    </div>
</body>
</html>
