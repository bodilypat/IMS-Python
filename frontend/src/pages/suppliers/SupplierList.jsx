//src/pages/Suppliers/SupplierList.jsx 

import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import SupplierTable from '../../components/tables/SupplierTable';
import supplierService from '../../services/supplierService';
import Button from '../../components/ui/Button';

const SupplierList = () => {
    const navigate = useNavigate();

    const [suppliers, setSuppliers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [total, setTotal] = useState(0);

    // Fetch suppliers 
    const fetchSuppliers = useCallback(async () => {
        setIsLoading(true);
        setErrorMsg(null);

        try {
            const response = await supplierService.getSuppliers({ search, page, limit });
            setSuppliers(response.data.suppliers);
            setTotal(response.data.total);  
        } catch (error) {
            console.error('Error loading suppliers:', error);
            setErrorMsg(
                error.response?.data?.message || 'Failed to load suppliers. Please try again.'
            );
        } finally {
            setIsLoading(false);
        }
    }, [search, page, limit]);

    useEffect(() => {
        fetchSuppliers();
    }, [fetchSuppliers]);

    // Delete Supplier
    const handleDelete = async (supplierId) => {
        if (!window.confirm('Are you sure you want to delete this supplier?')) return;

        try {
            await supplierService.deleteSupplier(supplierId);
            fetchSuppliers();
        } catch (error) {
            console.error('Error deleting supplier:', error);
            alert(
                error.response?.data?.message || 'Failed to delete supplier. Please try again.'
            );
        }
    };

    // Row Click -> detail page 
    const handleRowClick = (supplier) => {
        navigate(`/suppliers/${supplier.supplier_id}`);
    };

    // Pagination Controls 
    const totalPages = Math.ceil(total / limit);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Suppliers</h1>
                <Button onClick={() => navigate('/suppliers/create')}>Add Supplier</Button>
            </div>

            {/* Search Input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search suppliers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded w-full md:w-1/3"
                />
            </div>

            {/* Error Message */}
            {errorMsg && (
                <div className="text-red-500 mb-4">
                    {errorMsg}
                </div>
            )}

            {/* Supplier Table */}
            <SupplierTable
                suppliers={suppliers}
                isLoading={isLoading}
                onRowClick={handleRowClick}
                onDelete={handleDelete}
                onEdit={(row) => navigate(`/suppliers/edit/${row.supplier_id}`)}
            />
            {/* Empty state */}
            {!isLoading && suppliers.length === 0 && (
                <div className="text-gray-500 mt-4">No suppliers found.</div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <div>Page {page} of {totalPages}</div>
                <div>
                    <Button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>Previous</Button>
                    <span> {page} of {totalPages || 1} </span>
                    <Button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages} className="ml-2">Next</Button>
                </div>
            </div>  
        </div>
    );
};

