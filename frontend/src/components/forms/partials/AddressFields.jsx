//src/components/forms/partials/AddressFields.jsx 

import React from 'react';
import Input from '../../ui/Input';

const AddressFields = ({ 
    address,
    onChange,
    errors = {},
    required = false 
}) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({
            ...address,
            [name]: value
        });
    }

    return (
        <div className="address-fields space-y-4">
            <h3 className="text-lg font-medium">Address</h3>

            <Input
                label="Street"
                name="street"
                value={address.street || ''}
                onChange={handleChange}
                error= {errors.street}
                required={required}
            />
            <Input
                label="City"
                name="city"
                value={address.city || ''}
                onChange={handleChange}
                error= {errors.city}
                required={required}
            />
            <Input
                label="State / Province"
                name="state"
                value={address.state || ''}
                onChange={handleChange}
                error= {errors.state}
                required={required}
            />
            <Input
                label="Zip Code / Postal Code"
                name="zip"
                value={address.zip || ''}
                onChange={handleChange}
                error= {errors.zip}
                required={required}
            />
        </div>
    );
};
export default AddressFields;
