//src/components/forms/ProductForm.jsx

import React, { useState, useEffect } from 'react';
import { Form } from './FormElements';
import Button from '../ui/Button';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Select from '../ui/Select';
import { FaSave } from 'react-icons/fa';
import { fetchCategories } from '../../api/categories';

const ProductForm = ({ initialData = {}, onSubmit, isEdit = false }) => {
    const [formData, setFormData] = useState({
        sku: '',
        name: '',
        description: '',
        const_price: '',
        sale_price: '',
        quantity: '',
        category: '',
        vendor_id: '',
        status: 'active',
        image_url: '',
        ...initialData
    });

    const [categories, setCategories] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [errors, setErrors] = useState({});

    /* Fetch categories and vendors */
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            }
            catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
      
        const loadVendors = async () => {
            try {
                const response = await fetch('/api/vendors/');  
                if (!response.ok) throw new Error('Failed to fetch vendors');
                    const data = await response.json();
                    setVendors(data);
            } catch (error) {
                console.error('Error fetching vendors:', error);
            }
        };

        loadCategories();
        loadVendors();
    }, []);

    /* Handle input changes */
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    /* Validation */
    const validate = () => {
        const newErrors = {};
        const { sku, name, const_price, sale_price, quantity, category, vendor_id } = formData;
        if (!sku) newErrors.sku = 'SKU is required';
        if (!name) newErrors.name = 'Name is required';
        if (!const_price || isNaN(const_price)) newErrors.const_price = 'Valid cost price is required';
        if (!sale_price || isNaN(sale_price)) newErrors.sale_price = 'Valid sale price is required';
        if (!quantity || isNaN(quantity)) newErrors.quantity = 'Valid quantity is required';
        if (!category) newErrors.category = 'Category is required';
        if (!vendor_id) newErrors.vendor_id = 'Vendor is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    /* Handle form submission */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    /* Map options helper */
    const mapOptions = (items, valueKey ='id', labelKey = 'name') => 
        items.map(item => ({ value: item[valueKey], label: item[labelKey] }));
    
    return (
        <Form onSubmit={handleSubmit}>
        {/* SKU */}
            <Input
                label="SKU"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                error={errors.sku}
            />
        {/* Product Name */}
            <Input
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
            />
        {/* Description */}
            <TextArea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={errors.description}
            />
        {/* Cost Price */}
            <Input
                label="Cost Price"
                name="const_price"
                value={formData.const_price}
                onChange={handleChange}
                error={errors.const_price}
            />
        {/* Sale Price */}
            <Input
                label="Sale Price"
                name="sale_price"
                value={formData.sale_price}
                onChange={handleChange}
                error={errors.sale_price}
            />
        {/* Quantity */}
            <Input
                label="Quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                error={errors.quantity}
            />
        {/* Category */}
            <Select
                label="Category"    
                name="category"
                value={formData.category}
                onChange={handleChange} 
                options={categories.map(cat => ({ value: cat.name, label: cat.name }))}
                error={errors.category}
            />
        {/* Vendor */}
            <Select
                label="Vendor"  
                name="vendor_id"
                value={formData.vendor_id}
                onChange={handleChange}
                options={vendors.map(vendor => ({ value: vendor.id, label: vendor.name }))}
                error={errors.vendor_id}
            />
        {/* Status */}
            <Select
                label="Status"  
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={[
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' }
                ]}
                error={errors.status}
            />
        {/* Image URL */}
            <Input
                label="Image URL"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                error={errors.image_url}
            />  
            <Button type="submit">
                <FaSave /> {isEdit ? 'Update Product' : 'Create Product'}
            </Button>
        </Form>
    );
}
export default ProductForm;
