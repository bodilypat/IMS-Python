/* src/components/forms/PurchaseOrderItem.jsx */

import React from "react';

export default function PurchaseOrderItemForm({item, index, products, onChange, onRemove}) {
    const handleItemChange = (field, value) => {
        onChange(index, field, value);
    };

    const subtotal = (Number(item.quantity || 0) * Number(item.unit_price || 0)) - (Number(item.discount || 0) + Number(item.tax || 0));

     return (
        <tr>
            {/* Product Selection */}
            <td> <select value={item.product_id || ''} onChange={(e) => handleItemChange('product_id', e.target.value)}>
                <option value=''>Select Product</option>
                {products.map((product) => (
                    <option key={product.product_id} value={product.product_id}>
                        {product.name}
                    </option>
                ))}
            </select>
            </td>
            {/* Quantity */}
            <td>
                <input type="number" 
                       min="1" 
                       value={item.quantity || ''} 
                       onChange={(e) => handleItemChange('quantity', e.target.value)} 
                       required 
                />
            </td>

            {/* Unit Price */}
            <td>
                <input 
                    type="number" 
                    min="0"
                    step="0.01" 
                    value={item.unit_price || ''} 
                    onChange={(e) => handleItemChange('unit_price', e.target.value)} 
                    required
                />
            </td>

            {/* Discount */}
            <td>
                <input 
                    type="number" 
                    min="0" 
                    max="100"
                    step="0.01" 
                    value={item.discount || ''} 
                    onChange={(e) => handleItemChange('discount', e.target.value)} 
                />
            </td>

            {/* Tax */}
            <td>
                <input 
                    type="number" 
                    min="0" 
                    max="100"
                    step="0.01" 
                    value={item.tax || ''} 
                    onChange={(e) => handleItemChange('tax', e.target.value)} 
                />
            </td>

            {/* Subtotal */}
            <td>
                <input type="text" value={subtotal.toFixed(2)} readOnly />
            </td>

            {/* Remove Button */}
        </tr>
    );
}