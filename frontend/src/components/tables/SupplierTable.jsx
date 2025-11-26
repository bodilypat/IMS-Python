//src/components/tables/SupplierTable.jsx 

import React from 'react';
import Table from '../ui/Table';
import Badge from '../ui/Badgebg';
import Button form '../ui/Button';

const SupplierTable = ({
    suppliers = [],
    isLoading = false,
    onEdit = () => {},
    onDelete = () => {},
    onRowClick = () => {},
}) => {
    /* Table Column Definition   */
        const columns = [
        {
            key: "supplier_name",
            label: "Supplier Name",
        },
        {
            key: "email",
            label: "Email",
        },
        {
            key: "phone",
            label: "Phone",
        },
        {
            key: "address",
            label: "Address",
            render: (row) => (
                <span className="text-sm text-gray-600">
                    {row.address}, {row.city}, {row.state} {row.zip}
                </span>
            )
        },
        {
            key: "status",
            label: "Status",
            render: (row) => (
                <Badge type={row.status === "active" ? "success" : "default"}>
                    {row.status}
                </Badge>
            )
        },
        {
            key: "actions",
            label: "Actions",
            render: (row) => (
                <div className="flex space-x-2">
                    <Button onClick={() => onEdit(row)}>Edit</Button>
                    <Button onClick={() => onDelete(row.id)}>Delete</Button>
                </div>
            )
        }
    ];

    return (
        <Table
            columns={columns}
            data={suppliers}
            isLoading={isLoading}
            onRowClick={onRowClick}
        />
    );
};

