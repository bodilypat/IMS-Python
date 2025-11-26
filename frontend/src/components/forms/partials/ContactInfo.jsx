//src/components/forms/partials/ContactInfo.jsx 

import React from 'react';
import Input from '../../ui/Input';

const ContactInfo = ({ formData, handleChange }) => {
    return (
        <div className="contact-info">
            <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            <Input
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
            />
        </div>
    );
};
