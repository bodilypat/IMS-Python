//src/compoments/forms/partials/PriceFields.jsx 

import React from 'react';
import Input from '../../ui/Input';

const PriceFields = ({ form, setForm, price, setPrice, priceError }) => {
    const handlePriceChange = (e) => {
        const value = e.target.value;
        setPrice(value);
        setForm({ ...form, price: value });
    };
    return (
        <div className="price-fields">
            <Input  label="Cost Price" 
            />
            <Input
                label="Selling Price"
                value={price}
                onChange={handlePriceChange}
                error={priceError}
            />
        </div>
    );
}
export default PriceFields;