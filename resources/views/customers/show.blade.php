<!DOCTYPE html>
<html>
<head>
    <title>Customer Details</title>
    <!-- Add any CSS or JS links here -->
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>
    <div class="container">
        <h1>Customer Details</h1>

        <!-- Display customer details -->
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">{{ $customer->name }}</h2>

                <p><strong>Email:</strong> {{ $customer->email }}</p>
                <p><strong>Phone:</strong> {{ $customer->phone ?? 'N/A' }}</p>
                <p><strong>Address:</strong> {{ $customer->address ?? 'N/A' }}</p>
            </div>
        </div>

        <!-- Action buttons -->
        <div class="mt-3">
            <a href="{{ route('customers.edit', $customer->id) }}" class="btn btn-warning">Edit Customer</a>
            
            <form action="{{ route('customers.destroy', $customer->id) }}" method="POST" style="display:inline;">
                @csrf
                @method('DELETE')
                <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure you want to delete this customer?')">Delete Customer</button>
            </form>

            <!-- Link to go back to the customers list -->
            <a href="{{ route('customers.index') }}" class="btn btn-secondary mt-3">Back to List</a>
        </div>
    </div>
</body>
</html>
