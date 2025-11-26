//src/components/forms/SupplierForm.jsx

import React, { useState } from 'react';
import Input from "../ui/Input";
import ContactInfo from "./partials/ContactInfo";
import PriceFields from "./partials/PriceFields";
import AddressFields from "./partials/AddressFields"

import SubmitButton from "../ui/SubmitButton";
import CancelButton from "../ui/CancelButton";

const SupplierForm = ({ onSubmit, onCancel, initial = {} }) => {
    const [formData, setFormData] = useState({
        name: initial.name || '',
        contact: initial.contact || {},
        address: initial.address || {},
        priceDetails: initial.priceDetails || {}
    });

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Supplier Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
            />
            <ContactInfo
                data={formData.contact}
                onChange={(data) => handleChange('contact', data)}
            />
            <AddressFields
                data={formData.address}
                onChange={(data) => handleChange('address', data)}
            />
            <PriceFields
                data={formData.priceDetails}
                onChange={(data) => handleChange('priceDetails', data)}
            />
            <div className="flex justify-end space-x-2">
                <CancelButton onClick={onCancel} />
                <SubmitButton label="Save Supplier" />
            </div>
        </form>
    );
};
export default SupplierForm;
