//src/components/forms/WarehouseForm.jsx 

import React, { useState } from 'react';
import Input from "../ui/Input";

const WarehouseForm = ({ initial = {}, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: initial.name || '',
        location: initial.location || '',
        capacity: initial.capacity || '',
        manager: initial.manager || '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.name) newErrors.name = "Warehouse name is required.";
        if (!formData.location) newErrors.location = "Location is required.";
        if (!formData.capacity || isNaN(formData.capacity)) newErrors.capacity = "Valid capacity is required.";
        if (!formData.manager) newErrors.manager = "Manager name is required.";
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            onSubmit(formData);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <Input
                label="Warehouse Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={errors.name}
            />
            <Input
                label="Location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                error={errors.location}
            />
            <Input
                label="Capacity"
                value={formData.capacity}
                onChange={(e) => handleChange('capacity', e.target.value)}
                error={errors.capacity}
            />
            <Input
                label="Manager"
                value={formData.manager}
                onChange={(e) => handleChange('manager', e.target.value)}
                error={errors.manager}
            />
            <button type="submit">Submit</button>
        </form>
    );
}
export default WarehouseForm;
