<!DOCTYPE html>
<html>
<head>
    <title>Edit Sale</title>
    <!-- Add any CSS or JS links here -->
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>
    <div class="container">
        <h1>Edit Sale</h1>

        <!-- Display validation errors if any -->
        @if($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <!-- Form to edit an existing sale -->
        <form action="{{ route('sales.update', $sale->id) }}" method="POST">
            @csrf
            @method('PUT')

            <div class="form-group">
                <label for="customer_id">Customer:</label>
                <select id="customer_id" name="customer_id" class="form-control" required>
                    @foreach($customers as $customer)
                        <option value="{{ $customer->id }}" {{ $customer->id == $sale->customer_id ? 'selected' : '' }}>
                            {{ $customer->name }}
                        </option>
                    @endforeach
                </select>
            </div>

            <div class="form-group">
                <label for="item_id">Item:</label>
                <select id="item_id" name="item_id" class="form-control" required>
                    @foreach($items as $item)
                        <option value="{{ $item->id }}" {{ $item->id == $sale->item_id ? 'selected' : '' }}>
                            {{ $item->name }}
                        </option>
                    @endforeach
                </select>
            </div>

            <div class="form-group">
                <label for="quantity">Quantity:</label>
                <input type="number" id="quantity" name="quantity" class="form-control" value="{{ old('quantity', $sale->quantity) }}" required min="1">
            </div>

            <div class="form-group">
                <label for="price">Price:</label>
                <input type="number" id="price" name="price" class="form-control" value="{{ old('price', $sale->price) }}" required step="0.01">
            </div>

            <button type="submit" class="btn btn-primary">Update Sale</button>
        </form>

        <!-- Link to go back to the sales list -->
        <a href="{{ route('sales.index') }}" class="btn btn-secondary mt-3">Back to List</a>
    </div>
</body>
</html>
