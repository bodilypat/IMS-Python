@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Add New Vendor</h1>

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

    <!-- Vendor Form -->
    <form action="{{ route('vendors.store') }}" method="POST">
        @csrf

        <!-- Vendor Name -->
        <div class="form-group">
            <label for="name">Vendor Name</label>
            <input type="text" name="name" id="name" class="form-control" value="{{ old('name') }}" required>
        </div>

        <!-- Vendor Email -->
        <div class="form-group">
            <label for="email">Vendor Email</label>
            <input type="email" name="email" id="email" class="form-control" value="{{ old('email') }}" required>
        </div>

        <!-- Vendor Phone -->
        <div class="form-group">
            <label for="phone">Vendor Phone</label>
            <input type="text" name="phone" id="phone" class="form-control" value="{{ old('phone') }}" required>
        </div>

        <!-- Vendor Address -->
        <div class="form-group">
            <label for="address">Vendor Address</label>
            <textarea name="address" id="address" class="form-control" rows="3" required>{{ old('address') }}</textarea>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary">Add Vendor</button>

        <!-- Back Button -->
        <a href="{{ route('vendors.index') }}" class="btn btn-secondary">Back to Vendors List</a>
    </form>
</div>
@endsection
