//src/components/forms/partials/ContactInfo.jsx 

import React, { useState, useEffect } from 'react';
import Input from '../../ui/Input';

const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PhoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format

const ContactInfo = ({ 
    data = {}
    onChange,
    requireName = false,
    requireEmail = true,
    requirePhone = false,
}) => {
    return (
        const [form, setForm] = useState({
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || ''
        });

        const [errors, setErrors] = useState({});

        /* Sync with external initial data */
        useEffect(() => {
            setForm({
                name: data.name || '',
                email: data.email || '',
                phone: data.phone || ''
            });
        }, [data]);

        const validate = (field, value) => {
            let message = '';

            if (field === "email" && requireEmail) {
                if (!value) message = "Email is required.";
                else if (!EmailRegex.test(value)) message = "Invalid email format.";
            }

            if (field === "phone" && value && !PhoneRegex.test(value)) {
                message = "Invalid phone number format.";
            }

            if (field === "name" && requireName && !value) {
                message = "Name is required.";
            }

            return message;
        };

        const handleFieldChange = (e) => {
            const { name, value } = e.target;

            const update = { ...form, [name]: value };
            setForm(update);    

            const errorMsg = validate(name, value);
            setErrors({ ...errors, [name]: errorMsg });

            onChange(update, { ...errors, [name]: errorMsg });
        };

        return (
            <div className="contact-info space-y-4">
                {requireName && (
                    <Input
                        label="Name"
                        name="name"
                        value={form.name}
                        onChange={handleFieldChange}
                        error={errors.name}
                        reuired={requireName}
                    />
                )}
                
                <Input
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleFieldChange}
                    error={errors.email}
                    required={requireEmail}
                />
                <Input
                    label="Phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleFieldChange}
                    error={errors.phone}
                    required={requirePhone}
                />
        </div>
    );
};
export default ContactInfo;


