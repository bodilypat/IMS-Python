<!DOCTYPE html>
<html>
<head>
    <title>Edit Customer</title>
    <!-- Add any CSS or JS links here -->
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>
    <div class="container">
        <h1>Edit Customer</h1>

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

        <!-- Form to edit an existing customer -->
        <form action="{{ route('customers.update', $customer->id) }}" method="POST">
            @csrf
            @method('PUT')
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" class="form-control" value="{{ old('name', $customer->name) }}" required>
            </div>

            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" class="form-control" value="{{ old('email', $customer->email) }}" required>
            </div>

            <div class="form-group">
                <label for="phone">Phone:</label>
                <input type="text" id="phone" name="phone" class="form-control" value="{{ old('phone', $customer->phone) }}">
            </div>

            <div class="form-group">
                <label for="address">Address:</label>
                <textarea id="address" name="address" class="form-control">{{ old('address', $customer->address) }}</textarea>
            </div>

            <button type="submit" class="btn btn-primary">Update Customer</button>
        </form>

        <!-- Link to go back to the customers list -->
        <a href="{{ route('customers.index') }}" class="btn btn-secondary mt-3">Back to List</a>
    </div>
</body>
</html>
