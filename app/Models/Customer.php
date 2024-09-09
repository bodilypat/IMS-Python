<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    // Define the table associated with the model (optional if the table name follows Laravel's conventions)
    protected $table = 'customers';

    // Define the attributes that are mass assignable
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'created_at',
        'updated_at',
    ];

    // Define any relationships with other models
    // For example, if a customer can have many sales:
    public function sales()
    {
        return $this->hasMany(Sale::class);
    }

    // If you want to add custom behavior or accessors, you can do it here
    // For example, an accessor for formatted phone number:
    public function getFormattedPhoneAttribute()
    {
        return preg_replace('/(\d{3})(\d{3})(\d{4})/', '$1-$2-$3', $this->phone);
    }

    // Define any other methods or scopes you need
    // Example of a scope to filter active customers
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    // Example of a method to get full name if first and last names are separate
    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
