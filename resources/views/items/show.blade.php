<!DOCTYPE html>
<html>
<head>
    <title>Item Details</title>
    <!-- Add any CSS or JS links here -->
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>
    <div class="container">
        <h1>Item Details</h1>

        <!-- Display item details -->
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">{{ $item->name }}</h2>

                <p><strong>Description:</strong> {{ $item->description ?? 'N/A' }}</p>
                <p><strong>Quantity:</strong> {{ $item->quantity }}</p>
                <p><strong>Price:</strong> ${{ number_format($item->price, 2) }}</p>
                <p><strong>Cost:</strong> ${{ number_format($item->cost, 2) }}</p>
                <p><strong>Vendor:</strong> {{ $item->vendor ? $item->vendor->name : 'N/A' }}</p>
            </div>
        </div>

        <!-- Action buttons -->
        <div class="mt-3">
            <a href="{{ route('items.edit', $item->id) }}" class="btn btn-warning">Edit Item</a>
            
            <form action="{{ route('items.destroy', $item->id) }}" method="POST" style="display:inline;">
                @csrf
                @method('DELETE')
                <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure you want to delete this item?')">Delete Item</button>
            </form>

            <!-- Link to go back to the items list -->
            <a href="{{ route('items.index') }}" class="btn btn-secondary">Back to List</a>
        </div>
    </div>
</body>
</html>
