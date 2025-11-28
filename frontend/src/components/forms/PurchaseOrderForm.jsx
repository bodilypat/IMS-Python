//src/components/forms/PurchaseOrderForm.jsx 

import React, { useState } from 'react';
import Select from "../ui/Select";
import Input from "../ui/Input";
import DatePicker from "../ui/DatePicker";
import Button from '../ui/Button';
import ContactInfo from "./partials/ContactInfo";
import PriceFields from "./partials/PriceFields";
import TermsAndConditions from "./partials/TermsAndConditions";
import Attachments from "./partials/Attachments";
import FormHeader from "./partials/FormHeader";
import FormFooter from "./partials/FormFooter";

const PurchaseOrderForm = ({ suppliers = [], products = [], onSubmit, onCancel }) => {
    const [form, setForm] = useState({
        supplier: '',
        product: '',
        quantity: 1,
        orderDate: new Date(),
        deliveryDate: null,
        contactInfo: {
            name: '',
            email: '',
            phone: ''
        },
        priceDetails: {
            unitPrice: 0,
            tax: 0,
            totalPrice: 0
        },
        terms: '',
        attachments: []
    });
    
    const [errors, setError] = useState({});

    /* Auto calculate total price when quantity or unit price or tax changes */

    useEffect(() => {
        const qty = Number(form.quantity) || 0;
        const unit = Number(form.priceDetails.unitPrice) || 0;
        const tax = Number(form.priceDetails.tax) || 0;
        const total = qty * unit * (1 + tax / 100);
        setForm(prev => ({
            ...prev,
            priceDetails: {
                ...prev.priceDetails,
                totalPrice: total.toFixed(2)
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
        if (!form.supplier) newErrors.supplier = 'Supplier is required';
        if (!form.product) newErrors.product = 'Product is required';
        if (!form.quantity || isNaN(form.quantity) || form.quantity <= 0) newErrors.quantity = 'Valid quantity is required';
        if (!form.orderDate) newErrors.orderDate = 'Order date is required';
        
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
        <form onSubmit={handleSubmit} className="purchase-order-form space-y-4">
            <FormHeader title="Create Purchase Order" />
            <Select
                label="Supplier"
                options={suppliers.map(s => ({ value: s.id, label: s.name }))}
                value={form.supplier}
                onChange={(e) => handleChange('supplier', e.target.value)}
                error={errors.supplier}
                required
            />
            <Select
                label="Product"
                options={products.map(p => ({ value: p.id, label: p.name }))}
                value={form.product}
                onChange={(e) => handleChange('product', e.target.value)}
                error={errors.product}
                required
            />
            <Input
                label="Quantity"
                type="number"
                min={1}
                value={form.quantity}
                onChange={(e) => handleChange('quantity', e.target.value)}
                error={errors.quantity}
                required
            />
            <DatePicker
                label="Order Date"
                selected={form.orderDate}
                onChange={(date) => handleChange('orderDate', date)}
                error={errors.orderDate}
                required
            />
            <DatePicker 
                label="Delivery Date"
                selected={form.deliveryDate}
                onChange={(date) => handleChange('deliveryDate', date)}
            />
            <ContactInfo
                formData={form.contactInfo}
                onChange={(data) => handleChange('contactInfo', data)}
            />
            <PriceFields
                form={form.priceDetails}
                onChange={handlePriceChange}
                errors={errors.priceDetails}
            />
            <TermsAndConditions
                terms={form.terms}
                onChange={(e) => handleChange('terms', e.target.value)}
            />
            <Attachments
                attachments={form.attachments}
                onChange={(files) => handleChange('attachments', files)}
            />
            <FormFooter>
                {onCancel && (
                    <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                )}
                <Button type="submit">Submit</Button>
            </FormFooter>
        </form>
    );
}
export default PurchaseOrderForm;


            