//src/components/tables/SaleOrderTable.jsx

import React from 'react';
import GenericTable from './GenericTable';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const SaleOrderTable = ({ saleOrders = [], onView, onEdit, onDelete }) => {
    const statusVariant = (status) => {
        switch ((status || '').toLowerCase()) {
            case "confirmed":
            case "paid":
            case "delivered":
                return "success";
            case 'pending':
                return 'warning';
            case 'shipped':
                return 'info';
            case 'cancelled':
            case 'canceled':
                return 'danger';
            default:
                return 'neutral';
        }
    };

    const columns = [
        {
            key: 'sale_order_id',
            header: 'Order #',
            format: (value, row) => value ?? row.orderNumber ?? "-",
        },
        {
            key: 'order_date',
            header: 'Date',
            format: (value) => {
                if (!value) return "-";
                const d = new Date(value);
                return isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
            },
        },
        {
            key: 'customer_name',
            header: 'Customer',
            format: (value, row) => value ?? row.customer?.name ?? row.customer ?? '-',
        },
        {
            key: 'status',
            header: 'Status',
            format: (value) => (
                <Badge variant={statusVariant(value)}>
                    {value ?? 'Unknown'}
                </Badge>
            ),
        },
        {
            key: 'total_amount',
            label: 'Total',
            format: (value) => 
                typeof value === 'number' ? `$${value.toFixed(2)}` : '-',
        },
        {
            key: 'actions',
            label: 'Actions',
            format: (_, row) => (
                <div className="sale-order-actions">
                    {onView && (
                        <Button size="sm" onClick={() => onView(row)}>
                            View  
                        </Button>      
                    )}
                    {onEdit && (
                        <Button size="sm" onClick={() => onEdit(row)}>
                            Edit
                        </Button>
                    )}
                    {onDelete && (
                        <Button size="sm" variant="danger" onClick={() => onDelete(row)}>
                            Delete
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <GenericTable 
            columns={columns} 
            data={saleOrders}
            searchable={true}
            pageSize={10}
        />
    );
};

export default SaleOrderTable;