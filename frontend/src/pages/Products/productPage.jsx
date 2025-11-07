//src/pages/products/productPage.jsx

import React, { useEffect, useState } from 'react';
import productService from '../services/productService';
import { Link } from 'react-router-dom';

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await productService.getAll();
            setProducts(res.data);
            setLoading(false)
        } catch (error) {
            setError('Failed to fetch products');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await productService.delete();
            setProducts(products.filter((p) => p.id !== id));
        } catch (error) {
            setError('Failed to delete product')
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading products...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Products</h2>
                <Link to="products/add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Prodcut</Link>
            </div>

            <table className="min w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border">SKU</th>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Category</th>
                        <th className="py-2 px-4 border">Stock</th>
                        <th className="py-2 px-4 border">Price</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 ? (
                    <tr>
                        <td colSpan="6" className="text-center py-4">No product available</td>
                    </tr>
                    ) : (
                        products.map((product) => (
                            <tr key={product.id} className="bg-gray-50">
                                <td className="py-2 px-4 border_b">{product.sku}</td>
                                <td className="py-2 px-4 border_b">{product.name}</td>
                                <td className="py-2 px-4 border-b">{product.category}</td>
                                <td className="py-2 px-4 border-b">{product.stock}</td>
                                <td className="py-2 px-4 border-b">{product.price}</td>
                                <td className="py-2 px-4 border-b">
                                    <Link to={`/products/edit/$product.id`} className="text-blue-500 hover:underline mr-4">Edit</Link>
                                    <button onClick={() => handleDelete(product.id)} className="tex-red-500 hover:underline">Delete</button>
                                </td>
                                <td></td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}