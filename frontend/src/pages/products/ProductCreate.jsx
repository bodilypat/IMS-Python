// src/pages/products/ProductCreate.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/ui/SuccessMessage';
import ProductForm from '../../components/forms/ProductForm';
import { createProduct } from '../../services/productService';
import { fetchCategories } from '../../api/categoryApi';
import { fetchVendors } from '../../api/vendorApi';

const ProductCreate = () => {
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [categories, setCategories] = useState([]);
    const [vendors, setVendors] = useState([]);
    const navigate = useNavigate();
    const successTimeoutRef = useRef(null);

    useEffect(() => {
        let mounted = true;
        const loadData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [catRes, venRes] = await Promise.all([fetchCategories(), fetchVendors()]);
                if (!mounted) return;
                setCategories(Array.isArray(catRes) ? catRes : []);
                setVendors(Array.isArray(venRes) ? venRes : []);
            } catch (err) {
                if (!mounted) return;
                console.error('Failed loading categories/vendors', err);
                setError('Failed to load categories or vendors. Please try again.');
            } finally {
                if (mounted) setLoading(false);
            }
        };

        loadData();
        return () => {
            mounted = false;
            if (successTimeoutRef.current) {
                clearTimeout(successTimeoutRef.current);
            }
        };
    }, []);

    const handleSubmit = useCallback(
        async (productData) => {
            setSubmitting(true);
            setError(null);
            setSuccess(null);
            try {
                const created = await createProduct(productData);
                setSuccess('Product created successfully!');
                // Try to navigate to the created product detail if an id is returned, otherwise go to list
                const id = created?.id ?? created?._id;
                successTimeoutRef.current = setTimeout(() => {
                    navigate(id ? `/products/${id}` : '/products');
                }, 1500);
            } catch (err) {
                console.error('Create product failed', err);
                const message =
                    err?.response?.data?.message || err?.message || 'Failed to create product. Please check your input.';
                setError(message);
            } finally {
                setSubmitting(false);
            }
        },
        [navigate]
    );

    if (loading) return <Loading />;

    return (
        <div className="product-create-page">
            <h1>Create New Product</h1>

            {error && <ErrorMessage message={error} />}
            {success && <SuccessMessage message={success} />}

            {categories.length === 0 && (
                <p className="muted">No categories found. You can create a product without category or add categories first.</p>
            )}
            {vendors.length === 0 && (
                <p className="muted">No vendors found. You can create a product without vendor or add vendors first.</p>
            )}

            <ProductForm
                categories={categories}
                vendors={vendors}
                onSubmit={handleSubmit}
                isSubmitting={submitting}
            />
        </div>
    );
};

export default ProductCreate;
