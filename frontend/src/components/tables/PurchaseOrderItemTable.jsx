/* components/tables/PurchaseOrderItemTable.jsx */

import React from 'react';
import PropTypes from 'prop-types';

export default function PurchaseOrderItemTable({ items }) {
    /* Calculate subtotal for a row */
    const calculateSubtotal = (item) => {
        return (Number(item.quantity || 0) * Number(item.unit_price || 0)) - 
            Number(item.discount || 0) + Number(item.tax || 0);
    };

    return (
        <div className="po-item-tables">
            <table className="po-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Discount</th>
                        <th>Tax</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {items && items.length > 0 ? (
                        items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.product_name || "N/A"}</td>
                            <td>{item.quantity}</td>
                            <td>{Number(item.unit_price).toFixed(2)}</td>
                            <td>{Number(item.discount || 0).toFixed(2)}</td>
                            <td>{Number(item.tax || 0).toFixed(2)}</td>
                            <td>{calculateSubtotal(item).toFixed(2)}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6">No items available</td>
                    </tr>                    
                )}
            </tbody>
        </table>
    </div>
    );
}

PurchaseOrderItemTable.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            product_name: PropTypes.string,
            quantity: PropTypes.number,
            unit_price: PropTypes.number,
            discount: PropTypes.number,
            tax: PropTypes.number
        })
    )
};

PurchaseOrderItemTable.defaultProps = {
    items: []
};


