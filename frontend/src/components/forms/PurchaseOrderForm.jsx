//src/components/forms/PurchaseOrderForm.jsx 

import React, { useState } from 'react';
import Select from "../ui/Select";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import DatePicker from "../ui/DatePicker";
import ContactInfo from "./partials/ContactInfo";
import PriceFields from "./partials/PriceFields";
import TermsAndConditions from "./partials/TermsAndConditions";
import Attachments from "./partials/Attachments";
import FormHeader from "./partials/FormHeader";
import FormFooter from "./partials/FormFooter";

const PurchaseOrderForm = ({ suppliers, products, onSubmit }) => {
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
    const [price, setPrice] = useState({
        unitPrice: 0,
        tax: 0,
        totalPrice: 0
    });
    const [priceError, setPriceError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    }
    return (
        <form onSubmit={handleSubmit} className="purchase-order-form">
            <FormHeader title="Create Purchase Order" />
            <Select
                label="Supplier"
                options={suppliers}
                value={form.supplier}
                onChange={(e) => setForm({ ...form, supplier: e.target.value })}
                required
            />
            <Select
                label="Product"
                options={products}
                value={form.product}
                onChange={(e) => setForm({ ...form, product: e.target.value })}
                required
            />
            <Input
                label="Quantity"
                type="number"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                min={1}
                required
            />
            <DatePicker
                label="Order Date"
                selected={form.orderDate}
                onChange={(date) => setForm({ ...form, orderDate: date })}
                required
            />
            <DatePicker
                label="Delivery Date"
                selected={form.deliveryDate}
                onChange={(date) => setForm({ ...form, deliveryDate: date })}
            />
            <ContactInfo
                formData={form.contactInfo}
                handleChange={(data) => setForm({ ...form, contactInfo: data })}
            />
            <PriceFields
                form={form}
                setForm={setForm}
                price={price}
                setPrice={setPrice}
                priceError={priceError}
            />
            <TermsAndConditions
                terms={form.terms}
                onChange={(e) => setForm({ ...form, terms: e.target.value })}
            />
            <Attachments
                attachments={form.attachments}
                onChange={(files) => setForm({ ...form, attachments: files })}
            />
            <FormFooter />
        </form>
    );
}
export default PurchaseOrderForm;


            