//src/components/forms/ProductForm.jsx 

import React, { useState } from 'react';
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import Select from "../ui/Select";
import PriceFields from "./partials/PriceFields";
import AddressFields from "./partials/AddressFields"

const ProductForm = ({ onSubmit, initialData = {}, categories = [], suppliers = [] }) => {
    const [formData, setFormData] = useState({
        name: initialData.name || '',
        description: initialData.description || '',
        category: initialData.category || '',
        supplier: initialData.supplier || '',
        price: initialData.price || '',
        stock: initialData.stock || '',
        warehouseLocation: initialData.warehouseLocation || ''
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <TextArea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
            />
            <Select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={categories}
                required
            />
            <Select
                label="Supplier"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                options={suppliers}
                required
            />
            <PriceFields
                price={formData.price}
                onPriceChange={(value) => setFormData({...formData, price: value})}
            />
            <Input
                label="Stock Quantity"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                required
            />
            <AddressFields
                label="Warehouse Location"
                location
                value={formData.warehouseLocation}
                onChange={(value) => setFormData({...formData, warehouseLocation: value})}
            />
            <button type="submit">Save Product</button>
        </form>
    );
};
export default ProductForm;
