//src/pages/products/ProductDetail.jsx 

/* Fetch product by ID */
/* Loading + Error states  */
/* Image preview  */
/* Back + Edit buttons  */
/* Uses DB fields */
/* Clean UI block layout */ 
/* Uses productService  */


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../../components/ui/Loading';
import ErrorMessage from '../../components/ui/ErrorMessage';
import { Button } from '../../components/ui/Button';
import {FaArrowLeft , FaEdit} from 'react-icons/fa';
import { getProductById } from '../../services/productsService';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /* Fetch product by ID */

    useEffect(() => {
        const getProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (err) {
                console.error(err);     
                setError('Failed to fetch product details.');
            } finally {
                setLoading(false);
            }
        };
        getProduct();
    }, [id]);

    /* UI States */
    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;
    if (!product) return <ErrorMessage message="Product not found." />;

    /* Destructure DB Fields */
    const {
        product_name,
        sku,
        description,
        cost_price,
        sale_price,
        quantity_in_stock,
        product_image_url,
        status,
        ctegory_id,
        vendor_id,
        created_at,
        updated_at,
    } = product;
    
    return (
        <div className="product-detail-page">
            <Button onClick={() => navigate(-1)}>
                <FaArrowLeft /> Back
            </Button>

            <h1>{product_name}</h1>
            <div className="product-detail-container">
                {/* Product Image */}
                <div className="product-info-image">
                    <img src={product_image_url || '/placeholder-product.png'} 
                         alt={product_name}
                         style={{ maxWidth: '300px', maxHeight: '300px' }}
                    />
                </div>
                {/* Product Info */}
                <div className="product-info-details">
                    <p><strong>SKU:</strong> {sku}</p>
                    <p><strong>Description:</strong> {description}</p>
                    <p><strong>Cost Price:</strong> ${cost_price}</p>
                    <p><strong>Sale Price:</strong> ${sale_price}</p>
                    <p><strong>Quantity in Stock:</strong> {quantity_in_stock}</p>
                    <p><strong>Status:</strong> {status}</p>
                    <p><strong>Category ID:</strong> {ctegory_id}</p>
                    <p><strong>Vendor ID:</strong> {vendor_id}</p>
                    <p><strong>Created At:</strong> {new Date(created_at).toLocaleString()}</p>
                    <p><strong>Updated At:</strong> {new Date(updated_at).toLocaleString()}</p>
                </div>
            </div>
            
            {/* Edit Button */}
            <Button onClick={() => navigate(`/products/edit/${id}`)}>
                <FaEdit /> Edit Product
            </Button>
        </div>
    );
};
export default ProductDetail;
