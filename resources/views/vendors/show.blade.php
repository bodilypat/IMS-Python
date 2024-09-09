@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Vendor Details</h1>

    <!-- Vendor Information -->
    <div class="card">
        <div class="card-header">
            Vendor ID: {{ $vendor->id }}
        </div>
        <div class="card-body">
            <h5 class="card-title">Name: {{ $vendor->name }}</h5>
            <p class="card-text"><strong>Email:</strong> {{ $vendor->email }}</p>
            <p class="card-text"><strong>Phone:</strong> {{ $vendor->phone }}</p>
            <p class="card-text"><strong>Address:</strong> {{ $vendor->address }}</p>

            <!-- Edit Button -->
            <a href="{{ route('vendors.edit', $vendor->id) }}" class="btn btn-warning">Edit</a>

            <!-- Delete Button -->
            <form action="{{ route('vendors.destroy', $vendor->id) }}" method="POST" style="display:inline;">
                @csrf
                @method('DELETE')
                <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure you want to delete this vendor?')">Delete</button>
            </form>

            <!-- Back Button -->
            <a href="{{ route('vendors.index') }}" class="btn btn-secondary">Back to Vendors List</a>
        </div>
    </div>
</div>
@endsection
