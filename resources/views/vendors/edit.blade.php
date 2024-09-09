@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Edit Vendor</h1>

    <!-- Display Validation Errors -->
    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <!-- Edit Vendor Form -->
    <form action="{{ route('vendors.update', $vendor->id) }}" method="POST">
        @csrf
        @method('PUT')

        <!-- Vendor Name -->
        <div class="form-group">
            <label for="name">Vendor Name</label>
            <input type="text" name="name" id="name" class="form-control" value="{{ old('name', $vendor->name) }}" required>
        </div>

        <!-- Vendor Email -->
        <div class="form-group">
            <label for="email">Vendor Email</label>
            <input type="email" name="email" id="email" class="form-control" value="{{ old('email', $vendor->email) }}" required>
        </div>

        <!-- Vendor Phone -->
        <div class="form-group">
            <label for="phone">Vendor Phone</label>
            <input type="text" name="phone" id="phone" class="form-control" value="{{ old('phone', $vendor->phone) }}" required>
        </div>

        <!-- Vendor Address -->
        <div class="form-group">
            <label for="address">Vendor Address</label>
            <textarea name="address" id="address" class="form-control" rows="3" required>{{ old('address', $vendor->address) }}</textarea>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary">Update Vendor</button>

        <!-- Back Button -->
        <a href="{{ route('vendors.index') }}" class="btn btn-secondary">Back to Vendors List</a>
    </form>
</div>
@endsection
