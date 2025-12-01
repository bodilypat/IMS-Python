//src/pages/Suppliers/SupplierDetail.jsx 

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import supplierService from '../../services/supplierService';
import Button from '../../components/common/Button';

const SupplierDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [supplier, setSupplier] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);

    // Fetch supplier by ID
    const fetchSupplier = useCallback(async () => {
            setIsLoading(true);
            setErrorMsg(null);

            try {
                const response = await supplierService.getSupplierById(id);
                setSupplier(response.data);
            } catch (error) {
                console.error("Error fetching supplier:", error);
                setErrorMsg(
                    error?.response?.data?.detail || 
                    ""

                );
            } finally {
                setIsLoading(false);
            }
        }, [id]);

        useEffect(() => {
            fetchSupplier();
        }, [fetchSupplier]);

        // Delete Supplier 
        const handleDelete = async () => {
            if (window.confirm("Are you sure you want to delete this supplier?")) 
                return;
            
            try {
                await supplierService.deleteSupplier(id);
                navigate('/suppliers');
            } catch (error) {
                alert (
                    error?.response?.data?.detail || 
                    "An error occurred while deleting the supplier."
                );
            }
        };

        // Remder 
        if (isLoading) { return <p className="loading">Loading...</p>; }

        if (errorMsg) { 
            return (
                <div className="error-message">
                    <p>{errorMsg}</p>
                    <Button onClick={() => navigate('/suppliers')}>Back to Suppliers</Button>
                </div>
            );
        }

        if (!supplier) {
            return (
                <div className="p-6 text-gray-600">
                   Supplier not found.
                   <div className="mt-4">
                        <Button onClick={() => navigate('/suppliers')}>Back to Suppliers</Button>   
                   </div>
                </div>
            );
        }

        if (!supplier) {
            return ( <div className="p-6 text-gray-600">
                Supplier not found.
                <div className="mt-4">
                    <Button onClick={() => navigate('/suppliers')}>Back to Suppliers</Button>
                </div>
            </div> 
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{supplier.supplier_name}</h1>
                <div className="space-x-2">
                    <Button onClick={() => navigate(`/suppliers/edit/${supplier.supplier_id}`)}>
                        Edit
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </div>
            </div>
            
            {/* Supplier Details */}
            <div className="space-y-4">
                <DetailItem label="Contact Name" value={supplier.contact_name} />

                <DetailItem label="Contact Email" value={supplier.contact_email} />
                <DetailItem label="Contact Phone" value={supplier.contact_phone} />

                <DetailItem 
                    label="Address" 
                    value={
                        supplier.address?.street 
                            ? `${supplier.address.street}, ${supplier.address.city || ''}, ${
                                supplier.address.state || ''} ${supplier.address.zip || ''}, ${
                                supplier.address.country || '' 
                            }`
                            : "-"
                    } 
                />

                <DetailItem 
                    label="Status" 
                    value={
                        <span 
                            className={`px-3 py-1 rounded text-white ${ 
                                supplier.status === "Active" 
                                ? "bg-green-500" 
                                : "bg-red-500"
                            }`}
                        >
                            {supplier.status}
                        </span>
                    }
                />

                <DetailItem 
                    label="Created At" 
                    value={new Date(supplier.created_at).toLocaleString()} 
                />

                <DetailItem
                    label="Updated At"
                    value={new Date(supplier.updated_at).toLocaleString()}
                />

                <div className="mt-6">
                    <Button onClick={() => navigate('/suppliers')}>Back to Suppliers</Button>
                </div>
            </div>
        </div>
    );
};

export const DetailItem = ({ label, value }) => (
    <div className="flex space-x-4">
        <span className="font-semibold w-40">{label}:</span>
        <span>{value || "-"}</span>
    </div>
);

export default SupplierDetail;

            