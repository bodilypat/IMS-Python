//src/components/forms/WarehouseForm.jsx 

import React, { useState } from 'react';
import Input from "../ui/Input";
import Button form "../ui/Button";

const WarehouseForm = ({ initial = {}, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: initial.name || '',
        location: initial.location || '',
        capacity: initial.capacity || '',
        manager: initial.manager || '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Warehouse name is required.";
        if (!formData.location) newErrors.location = "Location is required.";
        if (!formData.capacity || isNaN(formData.capacity)) newErrors.capacity = "Valid capacity is required.";
        if (!formData.manager) newErrors.manager = "Manager name is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit({
                ...formData,
                capacity: Number(formData.capacity)
            });         
        }
    };  
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Warehouse Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={errors.name}
                required
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
                required
            />
            <Input
                label="Manager"
                value={formData.manager}
                onChange={(e) => handleChange('manager', e.target.value)}
                error={errors.manager}
                required
            />
            <div className="flex justify-end space-x-2">
                <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
                <Button type="submit">Save Warehouse</Button>
            </div>      
        </form>
    );
}
export default WarehouseForm;

