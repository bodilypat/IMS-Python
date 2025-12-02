//src/pages/sales/SaleOrderCreate.jsx 

import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import saleOrderService from '../../services/saleOrderService';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Notification from '../../components/ui/Notification';

const defaultItem = {
  product_id: '',
  product_name: '',
  quantity: 1,
  unit_price: 0,
};

const SaleOrderCreate = () => {
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [formData, setFormData] = useState({
        customer_name: '',
        order_date: new Date().toISOString().split('T')[0],
        shipping_address: '',
        shipping_provider: '',
        shipping_fee: 0,
        taxt: 0,
        items: [ { ...defaultItem } ],
    });

    /* Helpers */
    const calculateTotals = useCallback((field, value) => {
        set FormData((prev) => {
            const updatedItems = prev.items.map((item, index) => {
                if (index === field) {
                    return { ...item, ...value };
                }
                return item;
            });
            return { ...prev, items: updatedItems };
        });
    }, []);

    const subtotal = useMemo(() => {
        return formData.items.reduce((acc, item) => acc + item.quantity * item.unit_price, 0);
    }, [formData.items]);
    const taxAmount = useMemo(() => {
        return (subtotal * formData.taxt) / 100;
    }, [subtotal, formData.taxt]);
    const total = useMemo(() => {
        return subtotal + taxAmount + Number(formData.shipping_fee);
    }, [subtotal, taxAmount, formData.shipping_fee]);

    /* Handlers */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleItemChange = (index, field, value) => {
        calculateTotals(index, { [field]: value });
    };

    const handleAddItem = () => {
        setFormData((prev) => ({
            ...prev,
            items: [...prev.items, { ...defaultItem }],
        }));
    };

    const handleRemoveItem = (index) => {
        setFormData((prev) => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index),
        }));
    };

    /* Submit */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg('');

        try {
            await saleOrderService.createSaleOrder(formData);
            navigate('/sales/orders');
        } catch (error) {
            setErrorMsg(error.message || 'Failed to create sale order.');
        } finally {
            setIsSubmitting(false);
        }
    };

    /* Render */
    return (
        <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Create Sale Order</h1>
                <Button onClick={() => navigate('/sales/orders')} variant="secondary">
                    Back to Orders
                </Button>
            </div>
            {errorMsg && <Notification type="error" message={errorMsg} />}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/*Customer & Order Info  */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <h1 className="col-span-1 md:col-span-2 text-xl font-semibold">Customer Information</h1>
                    <Input
                        label="Customer Name"
                        name="customer_name"
                        value={formData.customer_name}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        label="Order Date"
                        name="order_date"
                        type="date"
                        value={formData.order_date}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {/* Shipping Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <h1 className="col-span-1 md:col-span-2 text-xl font-semibold">Shipping Details</h1>

                    <Input
                        label="Shipping Address"
                        name="shipping_address"
                        value={formData.shipping_address}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        label="Shipping Provider"
                        name="shipping_provider"
                        value={formData.shipping_provider}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        label="Shipping Fee"
                        name="shipping_fee"
                        type="number"
                        value={formData.shipping_fee}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        label="Tax (%)"
                        name="taxt"
                        type="number"
                        value={formData.taxt}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Items */}
                <div className="space-y-4">
                    <h1 className="text-xl font-semibold">Order Items</h1>
                    {formData.items.map((item, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                            <Input
                                label="Product ID"
                                value={item.product_id}
                                onChange={(e) => handleItemChange(index, 'product_id', e.target.value)}
                                required
                            />
                            <Input
                                label="Product Name"
                                value={item.product_name}
                                onChange={(e) => handleItemChange(index, 'product_name', e.target.value)}
                                required
                            />
                            <Input
                                label="Quantity"
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                                required
                            />
                            <Input
                                label="Unit Price"
                                type="number"
                                value={item.unit_price}
                                onChange={(e) => handleItemChange(index, 'unit_price', Number(e.target.value))}
                                required
                            />
                            <Button
                                type="button"
                                onClick={() => handleRemoveItem(index)}
                                variant="danger"
                                disabled={formData.items.length === 1}
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                    <Button type="button" onClick={handleAddItem} variant="primary">
                        Add Item
                    </Button>
                </div>

                {/* Totals */}
                <div className="space-y-2">
                    <h1 className="text-xl font-semibold">Totals</h1>
                    <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tax Amount:</span>
                        <span>${taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button type="submit" variant="success" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Create Order'}
                    </Button>
                </div>
            </form>
        </div>
    );
};



