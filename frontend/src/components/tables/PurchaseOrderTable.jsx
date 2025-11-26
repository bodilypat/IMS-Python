//src/components/tables/PurchaseOrderTable.jsx 

import React from "react";

const PurchaseOrderTable = ({ orders = [], onView, onEdit, onReceive, onDelete }) => {
    const getStatusBadge = (status) => {
        const base = "px-2 py-1 rounded text-white text-xs font-semibold";

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

    return (
        <div className="w-full overflow-x-auto bg-white rounded shadow-sm">
            <table className="w-full border-collapse">
                <thead className="bg-gray-100 border-b">
                    <tr>
                        <th className="px-4 py-2 text-left">ID</th>
                        <th className="px-4 py-2 text-left">Supplier</th>
                        <th className="px-4 py-2 text-left">Order Date</th>
                        <th className="px-4 py-2 text-left">Expected Delivery</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Total</th>
                        <th className="px-4 py-2 text-left">Actions</th>
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
                        orders.map((order) => (
                            <tr
                                key={order.purchase_order_id}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                <td className="px-4 py-2">{order.purchase_order_id}</td>

                                <td className="px-4 py-2">
                                    {order.supplier_name || "-"}
                                </td>

                                <td className="px-4 py-2">
                                    {order.order_date
                                        ? new Date(order.order_date).toLocaleDateString()
                                        : "-"}
                                </td>

                                <td className="px-4 py-2">
                                    {order.expected_delivery_date
                                        ? new Date(order.expected_delivery_date).toLocaleDateString()
                                        : "-"}
                                </td>

                                <td className="px-4 py-2">
                                    <span className={getStatusBadge(order.status)}>
                                        {order.status}
                                    </span>
                                </td>

                                <td className="px-4 py-2">
                                    ${Number(order.total_amount || 0).toFixed(2)}
                                </td>

                                <td className="px-4 py-2 space-x-2 whitespace-nowrap">
                                    {onView && (
                                        <button
                                            className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
                                            onClick={() => onView(order)}
                                        >
                                            View
                                        </button>
                                    )}

                                    {onEdit && (
                                        <button
                                            className="px-2 py-1 text-sm bg-green-600 text-white rounded"
                                            onClick={() => onEdit(order)}
                                        >
                                            Edit
                                        </button>
                                    )}

                                    {onReceive && (
                                        <button
                                            className="px-2 py-1 text-sm bg-yellow-500 text-white rounded"
                                            onClick={() => onReceive(order)}
                                        >
                                            Receive
                                        </button>
                                    )}

                                    {onDelete && (
                                        <button
                                            className="px-2 py-1 text-sm bg-red-600 text-white rounded"
                                            onClick={() => onDelete(order)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PurchaseOrderTable;
