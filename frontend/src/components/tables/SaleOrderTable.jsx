// src/components/tables/SaleOrderTable.jsx

import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import GenericTable from './GenericTable';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import '../ui/styles.css';

const SaleOrderTable = ({ saleOrders = [], onView, onEdit, onDelete }) => {

    /* HELPERS */

    // Normalize sale number key 
    const getSaleNumber = (row) => 
        row.saleNumber ?? row.sale_number ?? row.id ?? '-';

    // Normalze Customer name 
    const getCustomerName = (row) => 
        row.customer_name ??
        row.customer?.name ??
        row.customer?.fullName ??
        row.customer ?? '-';

    // Status ->badge variant mapping
    const statusVariant = useCallback((statusRaw) => {
        const status = (statusRaw || '').toLowerCase();

        switch (status) {
            case 'confirmed':
                return 'primary';
            case 'paid':
                return 'info';
            case 'shipped':
                return 'warning';
            case 'delivered':
                return 'success';
            case 'cancelled':
                return 'danger';
            default:
                return 'secondary';
        }
    }, []);

    // Currency formatter ( auto-detect if row.currency exists) 
    const getCurrencyFormatter = useCallback((currency = 'USD') => {
        try {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency,
            });
        } catch {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            });
        }   
    }, []); 

    /* Columns */
    const currencyFormatter = useMemo(() => {

        return [
            {
                key: 'sale_number',
                header: 'Sale #',
                render: (row) => getSaleNumber(row),
            },
            {
                key: 'order_date',
                header: 'Order Date',
                render: (row) => {
                    const date = row.order_date ? new Date(row.order_date) : null;
                    return date && !isNaN(date.getTime()) ? date.toLocaleDateString() : '-';
                },
            },
            {
                key: 'customer',
                header: 'Customer',
                render: (row) => getCustomerName(row),
            },
            {
                key: 'status',
                header: 'Status',
                render: (row) => (
                    <Badge 
                        variant={statusVariant(row.status)}>
                        {row.status ?? 'Unknown'}
                    </Badge>
                ),  
            },
            {
                key: 'total_amount',
                header: 'Total',
                render: (row) => {
                    const currency = row.currency || 'USD'; 
                    const formatter = getCurrencyFormatter(currency);
                    return typeof row.total_amount === 'number'
                        ? formatter.format(row.total_amount)
                        : row.total_amount != null && row.total_amount !== ''
                        ? String(row.total_amount)
                        : '-';
                },
            },
            {
                key: 'actions',
                header: 'Actions',
                render: (row) => (
                    <div className="sale-order-actions flex space-x-2">
                        {onView && (
                            <Button
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onView(row);
                                }}
                                aria-label={`View sale ${row.saleNumber ?? row.id}`}
                                title="View"
                            >
                                View
                            </Button>
                        )}
                        {onEdit && (
                            <Button
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(row);
                                }}
                                aria-label={`Edit sale ${row.saleNumber ?? row.id}`}
                                title="Edit"
                            >
                                Edit
                            </Button>
                        )}
                        {onDelete && (
                            <Button
                                size="sm"
                                variant="danger"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(row);
                                }}
                                aria-label={`Delete sale ${row.saleNumber ?? row.id}`}
                                title="Delete"
                            >
                                Delete
                            </Button>
                        )}
                    </div>
                ),
            },
        ];
    }, [getCurrencyFormatter, statusVariant, onView, onEdit, onDelete]);

    /* Render Table */
    return (
        <GenericTable 
            data={saleOrders}
            columns={currencyFormatter}
            noDataMessage="No sale orders available."
        />
    );
};
SaleOrderTable.propTypes = {
    saleOrders: PropTypes.arrayOf(PropTypes.object),
    onView: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
};

SaleOrderTable.defaultProps = {
    saleOrders: [],
    onView: null,
    onEdit: null,
    onDelete: null,
};
export default SaleOrderTable;

