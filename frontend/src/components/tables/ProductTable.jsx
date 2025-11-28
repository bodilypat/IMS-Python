// src/components/tables/ProductTable.jsx

import React, { useCallback, memo } from 'react';
import { Table } from './Table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const formatPrice = (value) => {
    const n = Number(value);
    return Number.isFinite(n) ? `$${n.toFixed(2)}` : '-';
};

const formatDate = (value) => {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? '-' : d.toLocaleDateString();
};

const ProductRow = memo(function ProductRow({ product, onView, onEdit, onDelete }) {
    return (
        <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.sku ?? '-'}</td>
            <td>{product.name ?? '-'}</td>
            <td>{formatPrice(product.const_price)}</td>
            <td>{formatPrice(product.sale_price)}</td>
            <td>{product.quantity ?? '-'}</td>
            <td>{product.category ?? '-'}</td>
            <td>{product.vendor_id ?? '-'}</td>
            <td>{product.status ?? '-'}</td>
            <td>
                {product.product_image_url ? (
                    <img
                        src={product.product_image_url}
                        alt={product.name ?? 'Product image'}
                        style={{ width: 50, height: 50, objectFit: 'cover' }}
                    />
                ) : (
                    'No image'
                )}
            </td>
            <td>{formatDate(product.create_at)}</td>
            <td>{formatDate(product.update_at)}</td>
            <td>
                <Button
                    variant="info"
                    onClick={() => onView(product.id)}
                    aria-label={`View product ${product.id}`}
                    style={{ marginRight: 8 }}
                >
                    View
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => onEdit(product.id)}
                    aria-label={`Edit product ${product.id}`}
                    style={{ marginRight: 8 }}
                >
                    <FaEdit />
                </Button>
                <Button
                    variant="danger"
                    onClick={() => onDelete(product.id)}
                    aria-label={`Delete product ${product.id}`}
                >
                    <FaTrash />
                </Button>
            </td>
        </tr>
    );
});

ProductRow.propTypes = {
    product: PropTypes.object.isRequired,
    onView: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export const ProductTable = ({ products, onDelete }) => {
    const navigate = useNavigate();

    const handleView = useCallback((id) => navigate(`/products/view/${id}`), [navigate]);
    const handleEdit = useCallback((id) => navigate(`/products/edit/${id}`), [navigate]);
    const handleDelete = useCallback((id) => onDelete(id), [onDelete]);

    return (
        <Table>
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">SKU</th>
                    <th scope="col">Name</th>
                    <th scope="col">Const Price</th>
                    <th scope="col">Sale Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Category</th>
                    <th scope="col">Vendor ID</th>
                    <th scope="col">Status</th>
                    <th scope="col">Image</th>
                    <th scope="col">Create At</th>
                    <th scope="col">Update At</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.length === 0 ? (
                    <tr>
                        <td colSpan="13" style={{ textAlign: 'center' }}>
                            No products found.
                        </td>
                    </tr>
                ) : (
                    products.map((product) => (
                        <ProductRow
                            key={product.id ?? product.sku}
                            product={product}
                            onView={handleView}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </tbody>
        </Table>
    );
};

ProductTable.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        sku: PropTypes.string,
        name: PropTypes.string,
        const_price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        sale_price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        category: PropTypes.string,
        vendor_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        status: PropTypes.string,
        product_image_url: PropTypes.string,
        create_at: PropTypes.string,
        update_at: PropTypes.string,
    })),
    onDelete: PropTypes.func.isRequired,
};

ProductTable.defaultProps = {
    products: [],
};

export default memo(ProductTable);
