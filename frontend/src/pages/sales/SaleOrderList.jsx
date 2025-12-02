// src/pages/sale/SaleOrderList.jsx

import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import saleOrderService from '../../services/saleOrderService';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import StatusBadge from '../../components/ui/StatusBadge';

function SaleOrderList() {
    const navigate = useNavigate();

    /* STATE */
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    /* FILTERS & PAGINATION */
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    /* debounce search to avoid too many requests */
    const searchDebounceRef = useRef(null);
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    useEffect(() => {
        clearTimeout(searchDebounceRef.current);
        searchDebounceRef.current = setTimeout(() => setDebouncedSearch(search.trim()), 350);
        return () => clearTimeout(searchDebounceRef.current);
    }, [search]);

    /* FORMATTERS */
    const currencyFormatter = useMemo(
        () =>
            new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }),
        []
    );

    const formatDateTime = useCallback((dateString) => {
        if (!dateString) return '—';
        const date = new Date(dateString);
        return date.toLocaleString();
    }, []);

    const getOrderKey = useCallback((order) => {
        if (!order) return Math.random().toString(36).slice(2);
        return order.id ?? `${order.sale_number ?? 'sale'}-${order.order_date ?? ''}`;
    }, []);

    /* Fetch Orders */
    const fetchOrders = useCallback(async () => {
        setIsLoading(true);
        setErrorMsg(null);

        try {
            const response = await saleOrderService.getSaleOrders({
                search: debouncedSearch,
                status: statusFilter,
                page,
                limit,
            });

            const data = response?.data ?? {};
            setOrders(Array.isArray(data.orders) ? data.orders : []);
            setTotalPages(data.total_pages ?? 1);
        } catch (error) {
            setErrorMsg(error?.response?.data?.message || 'Failed to fetch sale orders.');
        } finally {
            setIsLoading(false);
        }
    }, [debouncedSearch, statusFilter, page, limit]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    /* Delete Handler */
    const handleDelete = useCallback(
        async (orderId) => {
            if (!window.confirm('Are you sure you want to delete this order?')) return;

            try {
                await saleOrderService.deleteSaleOrder(orderId);

                // Optimistically update local list if possible.
                const updated = orders.filter((o) => o.id !== orderId);
                if (updated.length === 0 && page > 1) {
                    // If last item on page removed, go to previous page which triggers fetch
                    setPage((p) => p - 1);
                } else {
                    // Otherwise update list in-place
                    setOrders(updated);
                    // optionally refresh totals/pages if API provides accurate values
                    fetchOrders();
                }
            } catch (error) {
                alert(error?.response?.data?.message || 'Failed to delete the sale order.');
            }
        },
        [orders, page, fetchOrders]
    );

    /* Pagination */
    const goToPage = useCallback(
        (p) => {
            if (p < 1 || p > totalPages || p === page) return;
            setPage(p);
        },
        [page, totalPages]
    );

    const paginationButtons = useMemo(() => {
        const buttons = [];
        const range = 3; // pages before and after current

        for (let p = Math.max(1, page - range); p <= Math.min(totalPages, page + range); p++) {
            buttons.push(
                <Button key={p} onClick={() => goToPage(p)} disabled={p === page} aria-current={p === page}>
                    {p}
                </Button>
            );
        }
        return buttons;
    }, [page, totalPages, goToPage]);

    return (
        <div className="sale-order-list p-4">
            {/* Header */}
            <div className="header flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Sale Orders</h1>
                <Button onClick={() => navigate('/sales/orders/new')}>New Sale Order</Button>
            </div>

            {/* Filters */}
            <div className="filters flex flex-wrap gap-4 mb-4">
                <Input
                    type="text"
                    placeholder="Search by customer or order number"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    aria-label="Search Sale Orders"
                />

                <select
                    className="status-filter"
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setPage(1);
                    }}
                    aria-label="Filter by Status"
                >
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="completed">Completed</option>
                </select>

                <select
                    className="limit-selector"
                    value={limit}
                    onChange={(e) => {
                        setLimit(Number(e.target.value));
                        setPage(1);
                    }}
                    aria-label="Select items per page"
                >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={25}>25 per page</option>
                    <option value={50}>50 per page</option>
                </select>
            </div>

            {/* Error Message */}
            {errorMsg && <div className="error-message text-red-600 mb-4">{errorMsg}</div>}

            {/* Orders Table */}
            <table className="orders-table w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border-b p-2 text-left">Sale #</th>
                        <th className="border-b p-2 text-left">Order Date</th>
                        <th className="border-b p-2 text-left">Customer</th>
                        <th className="border-b p-2 text-left">Status</th>
                        <th className="border-b p-2 text-left">Total Amount</th>
                        <th className="border-b p-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan="6" className="p-4 text-center" aria-live="polite">
                                Loading...
                            </td>
                        </tr>
                    ) : orders.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="p-4 text-center">
                                No sale orders found.
                            </td>
                        </tr>
                    ) : (
                        orders.map((order) => (
                            <tr key={getOrderKey(order)} className="hover:bg-gray-50">
                                <td className="border-b p-2">{order.sale_number}</td>
                                <td className="border-b p-2">{formatDateTime(order.order_date)}</td>
                                <td className="border-b p-2">{order.customer_name}</td>
                                <td className="border-b p-2">
                                    <StatusBadge status={order.status} />
                                </td>
                                <td className="border-b p-2">{currencyFormatter.format(order.total_amount ?? 0)}</td>
                                <td className="border-b p-2">
                                    <div className="flex space-x-2">
                                        <Button size="sm" onClick={() => navigate(`/sales/orders/${order.id}`)} title="View">
                                            View
                                        </Button>
                                        <Button size="sm" onClick={() => navigate(`/sales/orders/${order.id}/edit`)} title="Edit">
                                            Edit
                                        </Button>
                                        <Button size="sm" variant="danger" onClick={() => handleDelete(order.id)} title="Delete">
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination flex items-center justify-center space-x-2 mt-4">
                <span>
                    Page {page} of {totalPages}
                </span>
                <div className="pagination-buttons flex space-x-1">
                    <Button onClick={() => goToPage(1)} disabled={page === 1}>
                        First
                    </Button>
                    <Button onClick={() => goToPage(page - 1)} disabled={page === 1}>
                        Previous
                    </Button>
                    {paginationButtons}
                    <Button onClick={() => goToPage(page + 1)} disabled={page === totalPages}>
                        Next
                    </Button>
                    <Button onClick={() => goToPage(totalPages)} disabled={page === totalPages}>
                        Last
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SaleOrderList;
