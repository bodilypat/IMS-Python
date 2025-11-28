//src/components/forms/SalesOrderForm.jsx 

import React, { useState } from 'react';
import Select from '../ui/Select';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import ContactInfo from './partials/ContactInfo';
import PriceFields from './partials/PriceFields';
import Button from '../ui/Button';

const SalesOrderForm = ({ products = [], onSubmit, onCancel }) => {
    const [form, setForm] = useState({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        product: '',
        quantity: 1,
        notes: '',
        priceDetails: {
            unitPrice: 0,
            tax: 0,
            totalPrice: 0
        }
    });

    const [errors, setErrors] = useState({});

    /* Auto-calculated price whenever quantity, unitPrice, or tax changes */
    useEffect(() => {
        const qty = Number(form.quantity) || 0;
        const unit = Number(form.priceDetails.unitPrice) || 0;
        const tax = Number(form.priceDetails.tax) || 0;
        const total = qty * unit * (1 + tax / 100);
        setForm(prev => ({
            ...prev,
            priceDetails: {
                ...prev.priceDetails,
                totalPrice: total
            }
        }));
    }, [form.quantity, form.priceDetails.unitPrice, form.priceDetails.tax]);

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handlePriceChange = (field, value) => {
        setForm(prev => ({
            ...prev,    
            priceDetails: {
                ...prev.priceDetails,
                [field]: value
            }
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!form.customerName.trim()) {
            newErrors.customerName = 'Customer name is required';
        }
        if (!form.customerEmail.trim()) {
            newErrors.customerEmail = 'Customer email is required';
        } else if (!/\S+@\S+\.\S+/.test(form.customerEmail)) {
            newErrors.customerEmail = 'Email address is invalid';
        }

        if (!form.product) {
            newErrors.product = 'Product selection is required';
        }
        if (!form.quantity || isNaN(form.quantity) || form.quantity <= 0) {
            newErrors.quantity = 'Valid quantity is required';
        }
        if (!form.priceDetails.unitPrice || isNaN(form.priceDetails.unitPrice) || form.priceDetails.unitPrice <= 0) {
            newErrors.priceDetails = newErrors.priceDetails || {};
            newErrors.priceDetails.unitPrice = 'Valid unit price is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(form);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <ContactInfo 
                data={{
                    mame: form.customerName,
                    email: form.customerEmail,
                    phone: form.customerPhone 
                    }}
                    onChange={(data) => 
                        setForm(prev => ({
                            ...prev,
                            customerName: data.name,
                            customerEmail: data.email,
                            customerPhone: data.phone
                        }))
                    }
                    errors={{
                        name: errors.customerName,
                        email: errors.customerEmail,
                        phone: errors.customerPhone
                    }}
            />
            <Select
                label="Product"
                value={form.product}
                onChange={(e) => setForm({ ...form, product: e.target.value })}
                options={products.map(p => ({ value: p.id, label: p.name }))}
                required
            />
            <Input
                label="Quantity"
                type="number"
                min="1"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                error={errors.quantity}
                required
            />
            <PriceFields
                form={form.priceDetails}
                onChange={handlePriceChange}
                errors={errors.priceDetails}
            />
            <TextArea
                label="Notes"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
            <div className="flex justify-end space-x-2">
                {onCancel && (
                    <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                )}
                <Button type="submit">Submit Order</Button>
            </div>
        </form>
    );
};
export default SalesOrderForm;
