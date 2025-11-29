// src/pages/products/ProductEdit.jsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/ui/SuccessMessage';
import ProductForm from '../../components/forms/ProductForm';
import { getProductById, updateProduct } from '../../services/productService';
import { fetchCategories } from '../../api/categoriesApi';
import { fetchVendors } from '../../api/vendorApi';

const ProductEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [vendors, setVendors] = useState([]);

    const isMountedRef = useRef(false);

    // Load product + categories + vendors
    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const [productRes, categoriesRes, vendorsRes] = await Promise.all([
                getProductById(id),
                fetchCategories(),
                fetchVendors(),
            ]);

            if (!isMountedRef.current) return;

            setProduct(productRes.data);
            setCategories(categoriesRes.data || []);
            setVendors(vendorsRes.data || []);
        } catch (err) {
            console.error('Failed to load data:', err);
            if (!isMountedRef.current) return;
            setError(
                err.response?.data?.message ||
                    'Failed to load product, categories, or vendors.'
            );
        } finally {
            if (isMountedRef.current) setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        isMountedRef.current = true;
        loadData();
        return () => {
            isMountedRef.current = false;
        };
    }, [loadData]);

    // Handle form submission
    const handleSubmit = useCallback(
        async (formData) => {
            setSubmitting(true);
            setError(null);
            setSuccess(null);

            try {
                await updateProduct(id, formData);
                if (!isMountedRef.current) return;
                setSuccess('Product updated successfully!');
                // navigate back to list after a short delay so user sees the success message
                setTimeout(() => navigate('/products'), 1500);
            } catch (err) {
                console.error('Update failed:', err);
                if (!isMountedRef.current) return;
                setError(
                    err.response?.data?.message ||
                        'Failed to update product. Please check your input.'
                );
            } finally {
                if (isMountedRef.current) setSubmitting(false);
            }
        },
        [id, navigate]
    );

    // Quick helpers for retry / cancel
    const handleRetry = () => loadData();
    const handleBack = () => navigate('/products');

    // Render
    return (
        <div className="product-edit-page">
            <h1>Edit Product</h1>

            {loading && <Loading />}

            {error && (
                <div style={{ marginBottom: 16 }}>
                    <ErrorMessage message={error} />
                    <div style={{ marginTop: 8 }}>
                        <button onClick={handleRetry} disabled={loading}>
                            Retry
                        </button>{' '}
                        <button onClick={handleBack}>Back to list</button>
                    </div>
                </div>
            )}

            {success && <SuccessMessage message={success} />}

            {!loading && !error && product && (
                <ProductForm
                    initialData={product}
                    categories={categories}
                    vendors={vendors}
                    onSubmit={handleSubmit}
                    isSubmitting={submitting}
                />
            )}
        </div>
    );
};

export default ProductEdit;
