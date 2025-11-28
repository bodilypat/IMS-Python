//src/components/forms/SupplierForm.jsx

import React, { useState } from 'react';
import Input from "../ui/Input";
import Select from "../ui/Select";
import ContactInfo from "./partials/ContactInfo";
import AddressFields from "./partials/AddressFields";
import SubmitButton from "../ui/SubmitButton";
import CancelButton from "../ui/CancelButton";

const SupplierForm = ({ onSubmit, onCancel, initial = {} }) => {
    const [formData, setFormData] = useState({
        name: initial.name || '',
        contact: initial.contact || {'email': '', 'phone': ''},
        address: initial.address || { 'street': '', 'city': '', 'state': '', 'zip': '', 'country': '' },
        status: initial.status || 'Active'
    });

    const [errors, setErrors] = useState({});

    /* Generic field updater */
    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    /* Validation before submit */
    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Supplier name is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;

        if(!formData.contact?.email && !formData.contact?.phone) {
            newErrors.contact = 'At least one contact method (email or phone) is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; 

        if(!formData.address?.street || !formData.address?.city) {
            newErrors.address = 'Complete address is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;

    };

    /*  */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Supplier Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={errors.name}
                required
            />
            <ContactInfo
                data={formData.contact}
                onChange={(data) => handleChange('contact', data)}
                error={errors.contact}
            />
            <AddressFields
                data={formData.address}
                onChange={(data) => handleChange('address', data)}
                errors={{
                    street: errors.address,
                    city: errors.address
                }}
            />
            <Select
                label="Status"
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                options={[
                    { value: 'Active', label: 'Active' },
                    { value: 'Inactive', label: 'Inactive' }
                ]}
            />  
            <div className="flex justify-end space-x-2">
                <CancelButton onClick={onCancel} />
                <SubmitButton label="Save Supplier" />
            </div>
        </form>
    );
};
export default SupplierForm;
