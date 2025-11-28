// src/components/tables/SupplierTable.jsx

import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Table from '../ui/Table';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const SupplierTable = ({
    suppliers,
    isLoading,
    onEdit,
    onDelete,
    onRowClick,
}) => {
    const handleEdit = useCallback(
        (e, row) => {
            e.stopPropagation();
            if (onEdit) onEdit(row);
        },
        [onEdit]
    );

    const handleDelete = useCallback(
        (e, id) => {
            e.stopPropagation();
            if (onDelete) onDelete(id);
        },
        [onDelete]
    );

    const columns = [
        {
            key: 'supplier_name',
            label: 'Supplier Name',
            render: (row) => row.supplier_name || '—',
        },
        {
            key: 'email',
            label: 'Email',
            render: (row) => row.email || '—',
        },
        {
            key: 'phone',
            label: 'Phone',
            render: (row) => row.phone || '—',
        },
        {
            key: 'address',
            label: 'Address',
            render: (row) => {
                const parts = [row.address, row.city, row.state, row.zip].filter(Boolean);
                return <span className="text-sm text-gray-600">{parts.length ? parts.join(', ') : '—'}</span>;
            },
        },
        {
            key: 'status',
            label: 'Status',
            render: (row) => {
                const type = row.status === 'active' ? 'success' : row.status === 'inactive' ? 'default' : 'warning';
                return <Badge type={type}>{row.status || 'unknown'}</Badge>;
            },
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (row) => (
                <div className="flex space-x-2">
                    <Button
                        type="button"
                        aria-label={`Edit ${row.supplier_name || 'supplier'}`}
                        onClick={(e) => handleEdit(e, row)}
                    >
                        Edit
                    </Button>
                    <Button
                        type="button"
                        variant="danger"
                        aria-label={`Delete ${row.supplier_name || 'supplier'}`}
                        onClick={(e) => handleDelete(e, row.id)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            data={suppliers}
            isLoading={isLoading}
            onRowClick={onRowClick}
            rowKey="id" // ensure the Table uses a stable key for rows if supported
        />
    );
};

SupplierTable.propTypes = {
    suppliers: PropTypes.arrayOf(PropTypes.object),
    isLoading: PropTypes.bool,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onRowClick: PropTypes.func,
};

SupplierTable.defaultProps = {
    suppliers: [],
    isLoading: false,
    onEdit: undefined,
    onDelete: undefined,
    onRowClick: undefined,
};

export default memo(SupplierTable);
