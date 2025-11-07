// src/pages/product/productList.jsx

import React, { useEffect, useState } from 'react';
import axios from '../services/api';

export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/products').then(res => setProducts(res.data));
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Product Inventory</h2>
            <table className="table-auto w-full">
                <thead><tr><th>Name</th><th>Stock</th></tr></thead>
                <tbody>
                {products.map(p => (
                    <tr key={p.sku}>
                        <td>{p.sku}</td>
                        <td>{p.product_name}</td>
                        <td>{p.product_name}</td>
                        <td>{p.stock_on_hand}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}