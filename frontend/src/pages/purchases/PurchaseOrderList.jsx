// src/pages/purchases/PurchaseOrderList.jsx

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PurchaseOrderTable from '../../components/tables/PurchaseOrderTable';
import purchaseOrderApi from '../../api/purchaseOrderApi';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';

export default function PurchaseOrderList() {
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);

    const navigate = useNavigate();
    const debouncedSearch = useDebounce(search, 250);

    /* Normalizes ID field  */
    const getPOId = (po) => po?.id ?? po?.purchase_order_id ?? po?.po_id ?? null;

    /* Fetch purchase orders */
    const fetchPurchaseOrders = useCallback(async (signal) => {
        try {
            setLoading(true);
            const response = await purchaseOrderApi.getAll({ signal });
            // Normalize reponse 
            const data = Array.isArray(response?data) ? response.data : [];

            setPurchaseOrders(
                data.map((po) => ({
                    ...po,
                    id: getPOId(po),
                }))
            );
            setErrorMsg(null);
        } catch (err) {
            if  (!signal.aborted) {
                console.error('Error fetching purchase orders:', err);
                setErrorMsg('Failed to load purchase orders.');
            }
        } finally {
            if (!signal.aborted) setLoading(false);
        }
    }, []);

    /* Initial load */
    useEffect(() => {
        const controller = new AbortController();
        fetchPurchaseOrders(controller.signal);
        return () => controller.abort();
    }, [fetchPurchaseOrders]);

    /* Client-side filtering */
    const filteredOrders = useMemo(() => {
        if (!debouncedSearch) return purchaseOrders;

        const term = debouncedSearch.toLowerCase();

        return purchaseOrders.filter((po) => {
            const poNum = String(po?.orderNumber ?? po?.poNumber ?? po?.purchase_order_number ?? '').toLowerCase();

            const supplier = String(po?.supplierName ?? po?.supplier ?? '').toLowerCase();
            const status = String(po?.status ?? '').toLowerCase();

            return poNum.includes(term) || supplier.includes(term) || status.includes(term);
        });
    }, [debouncedSearch, purchaseOrders]);

    /* Actions */
    const handleView = (order) => {
        const id = getPOId(order);
        navigate(`/purchases/orders/view/${id}`);
    };

    const handleEdit = useCallback((order) => {
        const id = getPOId(order);
        navigate(`/purchases/orders/edit/${id}`);
    }, [navigate]);

    const handleReceive = useCallback((order) => {
        const id = getPOId(order);
        navigate(`/purchases/orders/receive/${id}`);
    }, [navigate]);

    const handleDelete = useCallback(async (order) => {
        const id = getPOId(order);
        if (!window.confirm('Are you sure you want to delete this order?')) return;

        try {
            await purchaseOrderApi.delete(id);
            setPurchaseOrders((prevOrders) =>
                prevOrders.filter((po) => getPOId(po) !== id)
            );
        } catch (err) {
            console.error('Error deleting purchase order:', err);
            setErrorMsg('Failed to delete purchase order.');
        }
    }, []);

    /* Loading state */
    if (loading) {
        return <div>Loading purchase orders...</div>;
    }

    return (
        <div className="purchase-order p-4">
            <h2 className="text-2xl font-semibold mb-4">Purchase Orders</h2>

            {/* Search Input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by PO#, Supplier, or Status..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            {/* Error */}
            {errorMsg && (
                <div className="mb-2 text-red-600">
                    {errorMsg}
                    <Button 
                        onClick={() => fetchPurchaseOrders(new AbortController().signal)}
                        className="ml-4 px-3 py-1 bg-blue-600 text-white rounded"
                    >
                        Retry
                    </Button>
                </div>
            )}

            {/* Purchase Order Table */}
            {filteredOrders.length > 0 ? (
                <PurchaseOrderTable
                    orders={filteredOrders}
                    onView={handleView}
                    onEdit={handleEdit}
                    onReceive={handleReceive}
                    onDelete={handleDelete}
                />
            ) : (
                <div>No purchase orders found.</div>
            )}
        </div>
    );
}

