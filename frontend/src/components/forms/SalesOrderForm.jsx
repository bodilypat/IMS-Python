//src/components/forms/SalesOrderForm.jsx 

import React, { useState } from 'react';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Select from '../ui/Select';
import ContactInfo from './partials/ContactInfo';
import PriceFields from './partials/PriceFields';


const SalesOrderForm = ({ products, onSubmit }) => {
    const [form, setForm] = useState({
        customerName: '',
        customerEmail: '',
        product: '',
        quantity: 1,
        notes: ''
    });
    const [price, setPrice] = useState(0);
    const [priceError, setPriceError] = useState('');   

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...form, price });
    }
    return (
        <form onSubmit={handleSubmit}>
            <ContactInfo formData={form} handleChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} />
            <Select
                label="Product"
                name="product"
                value={form.product}
                onChange={(e) => setForm({ ...form, product: e.target.value })}
                options={products.map(p => ({ value: p.id, label: p.name }))}
                required
            />
            <Input
                label="Quantity"
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                min="1"
            />
            <PriceFields
                form={form}
                setForm={setForm}
                price={price}
                setPrice={setPrice}
                priceError={priceError}
            />
            <TextArea
                label="Notes"
                name="notes"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
            <button type="submit">Submit Order</button>
        </form>
    );
}
export default SalesOrderForm;
