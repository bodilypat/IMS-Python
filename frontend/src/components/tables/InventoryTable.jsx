//src/components/tables/InventoryTable.jsx 

import React from 'react';
import GenericTable from './GenericTable';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const InventoryTable = ({ 
                           items = [], 
                           onView,
                           onEdit,
                           onDelete,
                           rowKey = 'id',
                            showActions = true,
                        }) => {
    
    /* Determine stock status */
    
    const stockStatus = (quantity, reorderLevel = 0) => {
        if (quantity <=0 ) { 
            return { label: 'out of Stock', 'danger'};
        }
        if (quantity <= reorderLevel) {
            return { label: 'Low Stock', 'warning'};
        }
        return { label: 'In Stock', 'success'};
    };

    const statusMap = {
        in_stock: { label: 'In stock', variant: 'success' },
        low: { label: 'Low', variant: 'warning' },
        out_of_stock: { label: 'Out', variant: 'danger' },
    };

    const columns = [
        { 
            key: 'product_name',
            label: "product_name",
            format: (value, row) => value || row.product?.name || "_",
        },
        { 
            key: "sku",
            label: "SKU",
            format: (value, row) => value || row.sku || "_",
        },
        { 
            key: "warehouse_name",
            label: "Warehouse",
            format: (value, row) => value || row.warehouse?.name || "_",
        },
        {
            key: 'quantity',
            label: 'Quantity',
            format: (value, row) => value || row.quantity || "-",
        },
        {
            key: 'reorder_level',
            label: 'Reorder Level',
            format: (value, row) => value || row.reorder_level || "-",
        },

        { 
            key: 'status', 
            label: 'Status',
            format: (_,row) => {
                const [label, variant] = stockStatus(
                    row.quantity,
                    row.reorder_level ?? 0 
            );
                return <Badge variant={variant}>{label}</Badge>;
            },
        },
        {
            key: 'actions',
            label: 'Actions',
            format: (_, row) => (
                <div class="inventory-actions">
                    {onView && (<Button size="sm" onClick={() => onView(row)}>
                        View
                    </Button>
                    )}

                    {onEdit && (
                        <Button size="sm" onClick={() => onEdit(row)}>
                            Edit
                        </Button>
                    )}
                    {onDelete && (
                        <Button variant="danger" size="sm" onClick={() => onDelete(row)}>
                            Delete
                        </Button>
                    )}
                </div>
            ),
        }
    ];

    return (
        <GenericTable
            columns= {columns}
            data={inventory}
            searchable={true}
            pageSize={10}
            rowKey={rowKey}
        />
    );
};

export default InventoryTable;
