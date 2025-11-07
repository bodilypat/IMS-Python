//src/pages/products/addProduct.jsx 

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productService from '../services/productService';

export default function addProduct() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        sku: '',
        name: '',
        category: '',
        stock: '',
        price: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setProduct({...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await productService.create(product);
            navigate('/products');
        } catch (error) {
            setError('Failed to add product');
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add Product</h2>
            {error && <p className="text-real-500-mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-4">
                <input type="text" name="sku" placeholder="SKU" value={product.sku} onChange={handleChange} className="w-full border px-3 pxy-2 rounded" required />
                <input type="name" name="name" placeholder="Name" value={product.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
                <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleChange} className="w-full border px-3 py-2 rounded" reuired />
                <input type="number" name="stock" placeholder="Stock" value={product.stock} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
                <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add Product</button>
            </form>
        </div>
    );
}