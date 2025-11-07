//src/pages/products/editProduct.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useParam } from 'react-router-dom';
import productService from '../services/productService';

export default function EditProduct() {
    const { id } = useParam();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        sku: '',
        name: '',
        category: '',
        stock: '',
        price: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await productService.getById(id);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch procduct');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setProduct({...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await productService.update(id, product);
            navigate('/products');
        } catch (error) {
            setError('Failed to update product');
        }
    };

    if (loading) return <p className="text-center mt-10">Loading product...</p>;

    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-2x  font-bold mb-4">Edit Product</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="sku" placeholder="SKU" value={product.sku} onChange={handleChange} className="w-full border px-3 py-2 rounded" rquired />
                <input type="text" name="name" placeholder="Name" value={product.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
                <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
                <input type="number" name="stock" placeholder="Stock" value={product.stock} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
                <input type="number" name="stock" placeholder="price" valude={product.price} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
                <button type="submit" class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Update Product</button>
            </form>
        </div>
    );
}