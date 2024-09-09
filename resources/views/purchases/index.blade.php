<!DOCTYPE html>
<html>
<head>
    <title>Purchases List</title>
    <!-- Add any CSS or JS links here -->
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>
    <div class="container">
        <h1>Purchases</h1>

        <!-- Display success message if any -->
        @if(session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif

        <!-- Link to create a new purchase -->
        <a href="{{ route('purchases.create') }}" class="btn btn-primary mb-3">Add New Purchase</a>

        <!-- Purchases table -->
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Vendor</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach($purchases as $purchase)
                    <tr>
                        <td>{{ $purchase->id }}</td>
                        <td>{{ $purchase->vendor->name }}</td>
                        <td>{{ $purchase->item->name }}</td>
                        <td>{{ $purchase->quantity }}</td>
                        <td>${{ number_format($purchase->price, 2) }}</td>
                        <td>${{ number_format($purchase->quantity * $purchase->price, 2) }}</td>
                        <td>{{ $purchase->created_at->format('Y-m-d') }}</td>
                        <td>
                            <a href="{{ route('purchases.show', $purchase->id) }}" class="btn btn-info btn-sm">View</a>
                            <a href="{{ route('purchases.edit', $purchase->id) }}" class="btn btn-warning btn-sm">Edit</a>
                            <form action="{{ route('purchases.destroy', $purchase->id) }}" method="POST" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Are you sure you want to delete this purchase?')">Delete</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</body>
</html>
