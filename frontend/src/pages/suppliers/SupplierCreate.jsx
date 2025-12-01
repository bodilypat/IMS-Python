// src/pages/Suppliers/SupplierCreate.tsx

import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SupplierForm from '../../components/forms/SupplierForm';
import supplierService from '../../services/supplierService';

// Matches SupplierForm structure 
export interface SupplierFormValues {
    supplier_name: string;
    contact_email?: string | null;
    contact_phone?: string | null;
    address?: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
    status: 'Active' | 'Inactive' | 'Pending';
}

//Extracted user-friendly error message
const getErrorMessage = (error: unknown): string => {
    const anyErr = error as any;

    return (
        anyErr?.response?.data?.detail ||
        anyErr?.message?.data?.message ||
        anyErr?.message ||
        String(anyErr) ||
        'Something went wrong while creating supplier.'
    );
};

// Component
const SupplierCreate: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleSubmit = useCallback(async (data: SupplierFormValues) => {
        setErrorMsg(null);
        setLoading(true);

        try {
            await supplierService.createSupplier(data);

            navigate('/suppliers');
        } catch (error) {
            console.error('Error creating supplier:', error);
            setErrorMsg(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    const handleCancel = () => navigate('/suppliers');

    return (
        <div className="p-6 bg-white rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4">Create New Supplier</h1>

            {/* Error Banner */}
            {errorMsg && (
                <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-400 rounded">
                    {errorMsg}
                </div>
            )}
            <SupplierForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isLoading={isLoading}
                errorMsg={errorMsg}
            />
        </div>
    );
};
export default SupplierCreate;
