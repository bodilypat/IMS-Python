@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Vendors</h1>

    <!-- Button to create a new vendor -->
    <a href="{{ route('vendors.create') }}" class="btn btn-primary mb-3">Add New Vendor</a>

    <!-- Table displaying all vendors -->
    <table class="table table-striped">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @forelse($vendors as $vendor)
                <tr>
                    <td>{{ $vendor->id }}</td>
                    <td>{{ $vendor->name }}</td>
                    <td>{{ $vendor->email }}</td>
                    <td>{{ $vendor->phone }}</td>
                    <td>{{ $vendor->address }}</td>
                    <td>
                        <!-- Edit button -->
                        <a href="{{ route('vendors.edit', $vendor->id) }}" class="btn btn-warning btn-sm">Edit</a>

                        <!-- Delete button -->
                        <form action="{{ route('vendors.destroy', $vendor->id) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Are you sure you want to delete this vendor?')">Delete</button>
                        </form>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="6" class="text-center">No vendors found</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <!-- Pagination links -->
    <div class="mt-3">
        {{ $vendors->links() }}
    </div>
</div>
@endsection
