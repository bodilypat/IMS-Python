// /C:/Users/pc/Desktop/IMS/Python/frontend/src/pages/sale/SaleOrderDetails.jsx

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import saleOrderService from '../../services/saleOrderService';
import Button from '../../components/ui/Button';
import StatusBadge from '../../components/ui/StatusBadge';

const SaleOrderDetails = () => {
    const navigate = useNavigate();
    const { orderId } = useParams();

    const [saleOrder, setSaleOrder] = useState(null);
    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [errorMsg, setError] = useState(null);

    /* Formatters */
    const formatCurrency = useCallback((amount) => {
        if (amount == null || Number.isNaN(Number(amount))) return '-';
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
            Number(amount)
        );
    }, []);

    const formatDate = useCallback((dateStr) => {
        if (!dateStr) return '-';
        const date = new Date(dateStr);
        if (Number.isNaN(date.getTime())) return '-';
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }, []);

    /* Fetch Sale Order Details */
    const fetchSaleOrder = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const orderData = await saleOrderService.getSaleOrderById(orderId);
            setSaleOrder(orderData || null);
            setItems((orderData && orderData.items) || []);
        } catch (error) {
            console.error(error);
            setError('Failed to load sale order details.');
        } finally {
            setLoading(false);
        }
    }, [orderId]);

    useEffect(() => {
        if (orderId) fetchSaleOrder();
    }, [fetchSaleOrder, orderId]);

    /* Delete handler */
    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this sale order?')) return;
        try {
            await saleOrderService.deleteSaleOrder(orderId);
            navigate('/sales/orders');
        } catch (error) {
            console.error(error);
            setError('Failed to delete sale order.');
        }
    };

    /* Computed Values */
    const totalAmount = useMemo(() => {
        return items.reduce((total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0);
    }, [items]);
    const totalItems = useMemo(() => items.length, [items]);

    /* Render */
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (errorMsg) {
        return (
            <div className="error">
                {errorMsg} <Button onClick={fetchSaleOrder} className="ml-2">Retry</Button>
            </div>
        );
    }
    if (!saleOrder) {
        return <div>No sale order found.</div>;
    }

    return (
        <div className="sale-order-detail">
            <h1>Sale Order Detail - {saleOrder.orderNumber || orderId}</h1>

            <div className="flex justify-between mb-4">
                <Button onClick={() => navigate('/sales/orders')}>Back to Orders</Button>
                <div>
                    <Button onClick={() => navigate(`/sales/orders/edit/${orderId}`)} className="mr-2">Edit</Button>
                    <Button onClick={handleDelete} className="danger">Delete</Button>
                </div>
            </div>

            {/* Status */}
            <div className="mb-4">
                <strong>Status: </strong>
                <StatusBadge status={saleOrder.status} />
            </div>

            {/* Basic Info */}
            <div className="mb-4">
                <h2>Order Information</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div><strong>Order Number:</strong> {saleOrder.orderNumber || '-'}</div>
                    <div><strong>Order Date:</strong> {formatDate(saleOrder.orderDate)}</div>
                    <div><strong>Customer:</strong> {saleOrder.customerName || '-'}</div>
                    <div><strong>Total Amount:</strong> {formatCurrency(totalAmount)}</div>
                </div>
            </div>

            {/* Customer Info */}
            <div className="mb-4">
                <h2>Customer Information</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div><strong>Name:</strong> {saleOrder.customerName || '-'}</div>
                    <div><strong>Email:</strong> {saleOrder.customerEmail || '-'}</div>
                    <div><strong>Phone:</strong> {saleOrder.customerPhone || '-'}</div>
                    <div><strong>Address:</strong> {saleOrder.customerAddress || '-'}</div>
                </div>
            </div>

            {/* Shipping Info */}
            <div className="mb-4">
                <h2>Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div><strong>Shipping Method:</strong> {saleOrder.shippingMethod || '-'}</div>
                    <div><strong>Shipping Address:</strong> {saleOrder.shippingAddress || '-'}</div>
                    <div><strong>Shipping Date:</strong> {formatDate(saleOrder.shippingDate)}</div>
                </div>
            </div>

            {/* Financial Info */}
            <div className="mb-4">
                <h2>Financial Information</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div><strong>Subtotal:</strong> {formatCurrency(saleOrder.subtotal)}</div>
                    <div><strong>Tax:</strong> {formatCurrency(saleOrder.tax)}</div>
                    <div><strong>Discount:</strong> {formatCurrency(saleOrder.discount)}</div>
                    <div><strong>Total:</strong> {formatCurrency(saleOrder.total || totalAmount)}</div>
                </div>
            </div>

            {/* Items Table */}
            <div className="mb-4">
                <h2>Items ({totalItems})</h2>
                <table className="w-full table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Item Name</th>
                            <th className="border border-gray-300 px-4 py-2">Quantity</th>
                            <th className="border border-gray-300 px-4 py-2">Price</th>
                            <th className="border border-gray-300 px-4 py-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center p-4">No items</td>
                            </tr>
                        ) : (
                            items.map((item) => {
                                const key = item.id || item._id || `${item.name}-${Math.random()}`;
                                const qty = Number(item.quantity) || 0;
                                const price = Number(item.price) || 0;
                                return (
                                    <tr key={key}>
                                        <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{qty}</td>
                                        <td className="border border-gray-300 px-4 py-2">{formatCurrency(price)}</td>
                                        <td className="border border-gray-300 px-4 py-2">{formatCurrency(price * qty)}</td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SaleOrderDetails;
