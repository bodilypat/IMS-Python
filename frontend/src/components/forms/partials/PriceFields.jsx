//src/compoments/forms/partials/PriceFields.jsx 

import React, { useState, useEffect } from 'react';
import Input from '../../ui/Input';

const PriceFields = ({ 
    data,
    onChange,
    showCost = true,
    showDiscount = true,
    showTax = true 
}) => {
    const [fields, setFields] = useState({
        costPrice: data.costPrice || 0,
        sellingPrice: data.sellingPrice || 0,
        discount: data.discount || 0,
        tax: data.tax || 0,
        finalPrice: 0,
    });
    
    const [ errors, setErrors ] = useState({});

    /* Calculate final price */
    useEffect(() => {
        const { sellingPrice, discount, tax } = fields;

        let price = parseFloat(sellingPrice) || 0;
        let disc = parseFloat(discount) || 0;
        let taxAmountt = parseFloat(tax) || 0;

        const discounted = price - (price * (disc / 100));
        const taxed = discounted * (taxAmountt / 100);

        const finalValue = Number(taxed + discounted).toFixed(2);

        const updatedFields = { ...fields, finalPrice: finalValue };
        setFields(updatedFields);
        onChange(updatedFields);
    }, [fields.sellingPrice, fields.discount, fields.tax]);

    const validate = (name, value) => {
        if (["costPrice", "sellingPrice"].includes(name)) {
            if (isNaN(value) || parseFloat(value) < 0) {
                return "Price must be a non-negative number.";
            }
            if (["discount", "tax"].includes(name)) {
                if (isNaN(value) || parseFloat(value) < 0 || parseFloat(value) > 100) {
                    return "Must be between 0 and 100.";
                }
            }
        }
        return "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        const numeric = value.replace(/[^0-9.]/g, '');// sanitize input 
        const numberValue = numeric === '' ? '' : parseFloat(numeric);

        const error = validate(name, numberValue);
        setErrors((prev) => ({ ...prev, [name]: error}));

        setFields((prev) => ({
            ...prev,
            [name]: numberValue
        }));
    };

    return (
        <div className="price-fields space-y-4">
            {showCost && (
                <Input
                    label="Cost Price"
                    name="costPrice"
                    type="number"
                    value={fields.costPrice}
                    onChange={handleChange}
                    error={errors.costPrice}
                />
            )}
                <Input
                    label="Selling Price"
                    name="sellingPrice"
                    type="number"
                    value={fields.sellingPrice}
                    onChange={handleChange}
                    error={errors.sellingPrice}
                    required
                />
            {showDiscount && (
                <Input
                    label="Discount (%)"
                    name="discount"
                    type="number"
                    value={fields.discount}
                    onChange={handleChange}
                    error={errors.discount}
                />
            )}
            {showTax && (
                <Input
                    label="Tax (%)"
                    name="tax"
                    type="number"
                    value={fields.tax}
                    onChange={handleChange}
                    error={errors.tax}
                />
            )}
            {/* Computed Final Price */}
                <Input
                    label="Final Price"
                    name="finalPrice"
                    type="number"
                    value={fields.finalPrice}
                    readOnly
                />
        </div>
    );
}
export default PriceFields;