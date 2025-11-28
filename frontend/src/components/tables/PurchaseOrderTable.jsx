// src/components/tables/PurchaseOrderTable.jsx

import React, { memo } from "react";
import PropTypes from "prop-types";

const dateOptions = { year: "numeric", month: "short", day: "numeric" };
const currencyFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
});

const formatDate = (value) =>
    value ? new Date(value).toLocaleDateString(undefined, dateOptions) : "-";

const formatCurrency = (value) => currencyFormatter.format(Number(value || 0));

const getStatusBadge = (status) => {
    const base = "px-2 py-1 rounded text-white text-xs font-semibold inline-block";
    switch (status) {
        case "Pending":
            return `${base} bg-yellow-500`;
        case "Approved":
            return `${base} bg-blue-500`;
        case "Shipped":
            return `${base} bg-purple-500`;
        case "Delivered":
            return `${base} bg-green-600`;
        case "Cancelled":
            return `${base} bg-red-600`;
        default:
            return `${base} bg-gray-500`;
    }
};

const PurchaseOrderTable = ({ orders = [], onView, onEdit, onReceive, onDelete }) => {
    return (
        <div className="w-full overflow-x-auto bg-white rounded shadow-sm" role="region" aria-label="Purchase orders table">
            <table className="w-full border-collapse" aria-describedby="po-table-desc">
                <caption id="po-table-desc" className="sr-only">
                    List of purchase orders
                </caption>
                <thead className="bg-gray-100 border-b">
                    <tr>
                        <th scope="col" className="px-4 py-2 text-left">ID</th>
                        <th scope="col" className="px-4 py-2 text-left">Supplier</th>
                        <th scope="col" className="px-4 py-2 text-left">Order Date</th>
                        <th scope="col" className="px-4 py-2 text-left">Expected Delivery</th>
                        <th scope="col" className="px-4 py-2 text-left">Status</th>
                        <th scope="col" className="px-4 py-2 text-left">Total</th>
                        <th scope="col" className="px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center py-4 text-gray-500">
                                No purchase orders found.
                            </td>
                        </tr>
                    ) : (
                        orders.map((order) => {
                            const id = order?.purchase_order_id ?? "";
                            return (
                                <tr key={id} className="border-b hover:bg-gray-50 transition">
                                    <td className="px-4 py-2">{id || "-"}</td>

                                    <td className="px-4 py-2" title={order?.supplier_name || ""}>
                                        {order?.supplier_name || "-"}
                                    </td>

                                    <td className="px-4 py-2" title={order?.order_date || ""}>
                                        {formatDate(order?.order_date)}
                                    </td>

                                    <td className="px-4 py-2" title={order?.expected_delivery_date || ""}>
                                        {formatDate(order?.expected_delivery_date)}
                                    </td>

                                    <td className="px-4 py-2">
                                        <span className={getStatusBadge(order?.status)} aria-label={`status ${order?.status || "Unknown"}`}>
                                            {order?.status || "Unknown"}
                                        </span>
                                    </td>

                                    <td className="px-4 py-2">{formatCurrency(order?.total_amount)}</td>

                                    <td className="px-4 py-2 space-x-2 whitespace-nowrap">
                                        {onView && (
                                            <button
                                                type="button"
                                                className="px-2 py-1 text-sm bg-blue-500 text-white rounded focus:outline-none focus:ring"
                                                onClick={() => onView(order)}
                                                aria-label={`View purchase order ${id}`}
                                            >
                                                View
                                            </button>
                                        )}

                                        {onEdit && (
                                            <button
                                                type="button"
                                                className="px-2 py-1 text-sm bg-green-600 text-white rounded focus:outline-none focus:ring"
                                                onClick={() => onEdit(order)}
                                                aria-label={`Edit purchase order ${id}`}
                                            >
                                                Edit
                                            </button>
                                        )}

                                        {onReceive && (
                                            <button
                                                type="button"
                                                className="px-2 py-1 text-sm bg-yellow-500 text-white rounded focus:outline-none focus:ring"
                                                onClick={() => onReceive(order)}
                                                aria-label={`Receive purchase order ${id}`}
                                            >
                                                Receive
                                            </button>
                                        )}

                                        {onDelete && (
                                            <button
                                                type="button"
                                                className="px-2 py-1 text-sm bg-red-600 text-white rounded focus:outline-none focus:ring"
                                                onClick={() => onDelete(order)}
                                                aria-label={`Delete purchase order ${id}`}
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
};

PurchaseOrderTable.propTypes = {
    orders: PropTypes.arrayOf(PropTypes.object),
    onView: PropTypes.func,
    onEdit: PropTypes.func,
    onReceive: PropTypes.func,
    onDelete: PropTypes.func,
};

export default memo(PurchaseOrderTable);
