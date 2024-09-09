<!DOCTYPE html>
<html>
<head>
    <title>Edit Item</title>
    <!-- Add any CSS or JS links here -->
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>
    <div class="container">
        <h1>Edit Item</h1>

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

        <!-- Form to edit an existing item -->
        <form action="{{ route('items.update', $item->id) }}" method="POST">
            @csrf
            @method('PUT')
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" class="form-control" value="{{ old('name', $item->name) }}" required>
            </div>

            <div class="form-group">
                <label for="description">Description:</label>
                <textarea id="description" name="description" class="form-control">{{ old('description', $item->description) }}</textarea>
            </div>

            <div class="form-group">
                <label for="quantity">Quantity:</label>
                <input type="number" id="quantity" name="quantity" class="form-control" value="{{ old('quantity', $item->quantity) }}" min="0" required>
            </div>

            <div class="form-group">
                <label for="price">Price:</label>
                <input type="number" id="price" name="price" class="form-control" value="{{ old('price', $item->price) }}" step="0.01" min="0" required>
            </div>

            <div class="form-group">
                <label for="cost">Cost:</label>
                <input type="number" id="cost" name="cost" class="form-control" value="{{ old('cost', $item->cost) }}" step="0.01" min="0" required>
            </div>

            <div class="form-group">
                <label for="vendor_id">Vendor:</label>
                <select id="vendor_id" name="vendor_id" class="form-control">
                    <option value="">None</option>
                    @foreach($vendors as $vendor)
                        <option value="{{ $vendor->id }}" {{ old('vendor_id', $item->vendor_id) == $vendor->id ? 'selected' : '' }}>
                            {{ $vendor->name }}
                        </option>
                    @endforeach
                </select>
            </div>

            <button type="submit" class="btn btn-primary">Update Item</button>
        </form>

        <!-- Link to go back to the items list -->
        <a href="{{ route('items.index') }}" class="btn btn-secondary mt-3">Back to List</a>
    </div>
</body>
</html>
