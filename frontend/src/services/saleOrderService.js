// src/services/saleOrderService.js

import saleOrderApi from '../api/saleOrderApi';

/* Normalize API responses and consistently return: { success, data, error } */
const wrap = async (promise) => {
    try {
        const response = await promise;
        return { success: true, data: response?.data ?? null, error: null };
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error?.message || 'An unknown error occurred';
        return { success: false, data: null, error: errorMessage };
    }
};

/* Small validators that return the wrap-shaped error when invalid */
const invalid = (msg) => ({ success: false, data: null, error: msg });
const requireId = (id, name = 'id') => (id === undefined || id === null ? invalid(`${name} is required`) : null);

const saleOrderService = {
    /* Basic CRUD */
    async getSaleOrders(params = {}) {
        return wrap(saleOrderApi.getSaleOrders(params));
    },

    async getSaleOrderById(id) {
        const err = requireId(id, 'order id');
        if (err) return err;
        return wrap(saleOrderApi.getSaleOrderById(id));
    },

    async createSaleOrder(data = {}) {
        if (!data) return invalid('payload required');
        return wrap(saleOrderApi.createSaleOrder(data));
    },

    async updateSaleOrder(id, data = {}) {
        const err = requireId(id, 'order id');
        if (err) return err;
        return wrap(saleOrderApi.updateSaleOrder(id, data));
    },

    async deleteSaleOrder(id) {
        const err = requireId(id, 'order id');
        if (err) return err;
        return wrap(saleOrderApi.deleteSaleOrder(id));
    },

    /* Sale Order Items */
    async getSaleOrderItems(orderId) {
        const err = requireId(orderId, 'order id');
        if (err) return err;
        return wrap(saleOrderApi.getSaleOrderItems(orderId));
    },

    async addSaleOrderItem(orderId, itemData = {}) {
        const err = requireId(orderId, 'order id');
        if (err) return err;
        return wrap(saleOrderApi.addSaleOrderItem(orderId, itemData));
    },

    async updateSaleOrderItem(orderId, itemId, itemData = {}) {
        if (requireId(orderId, 'order id')) return requireId(orderId, 'order id');
        if (requireId(itemId, 'item id')) return requireId(itemId, 'item id');
        return wrap(saleOrderApi.updateSaleOrderItem(orderId, itemId, itemData));
    },

    async deleteSaleOrderItem(orderId, itemId) {
        if (requireId(orderId, 'order id')) return requireId(orderId, 'order id');
        if (requireId(itemId, 'item id')) return requireId(itemId, 'item id');
        return wrap(saleOrderApi.deleteSaleOrderItem(orderId, itemId));
    },

    /* STATUS & WORKFLOW */
    async updateSaleOrderStatus(id, status) {
        const err = requireId(id, 'order id');
        if (err) return err;
        if (!status) return invalid('status is required');
        return wrap(saleOrderApi.updateSaleOrderStatus(id, status));
    },

    async confirmSaleOrder(id) {
        const err = requireId(id, 'order id');
        if (err) return err;
        return wrap(saleOrderApi.confirmSaleOrder(id));
    },

    async shipSaleOrder(id) {
        const err = requireId(id, 'order id');
        if (err) return err;
        return wrap(saleOrderApi.shipSaleOrder(id));
    },

    async deliverSaleOrder(id) {
        const err = requireId(id, 'order id');
        if (err) return err;
        return wrap(saleOrderApi.deliverSaleOrder(id));
    },

    async cancelSaleOrder(id) {
        const err = requireId(id, 'order id');
        if (err) return err;
        return wrap(saleOrderApi.cancelSaleOrder(id));
    },

    async completeSaleOrder(id) {
        const err = requireId(id, 'order id');
        if (err) return err;
        return wrap(saleOrderApi.completeSaleOrder(id));
    },

    /* PAYMENT */
    async recordPayment(orderId, paymentData = {}) {
        const err = requireId(orderId, 'order id');
        if (err) return err;
        return wrap(saleOrderApi.recordPayment(orderId, paymentData));
    },

    async updatePaymentRecord(orderId, paymentId, paymentData = {}) {
        if (requireId(orderId, 'order id')) return requireId(orderId, 'order id');
        if (requireId(paymentId, 'payment id')) return requireId(paymentId, 'payment id');
        return wrap(saleOrderApi.updatePaymentRecord(orderId, paymentId, paymentData));
    },

    async getPaymentHistory(orderId) {
        const err = requireId(orderId, 'order id');
        if (err) return err;
        return wrap(saleOrderApi.getPaymentHistory(orderId));
    },

    async refundPayment(orderId, refundData = {}) {
        const err = requireId(orderId, 'order id');
        if (err) return err;
        return wrap(saleOrderApi.refundPayment(orderId, refundData));
    },

    /* DISCOUNT & TAXES */
    async applyDiscount(id, discountData = {}) {
        const err = requireId(id, 'order id');
        if (err) return err;
        return wrap(saleOrderApi.applyDiscount(id, discountData));
    },

    async applyTaxes(id, taxData = {}) {
        const err = requireId(id, 'order id');
        if (err) return err;
        return wrap(saleOrderApi.applyTaxes(id, taxData));
    },

    /* HELPERS */

    // Calculate subtotal, tax amount and total. Items can have `price` or `unit_price`.
    calculateTotals(items = [], taxPercent = 0, shippingFee = 0) {
        if (!Array.isArray(items)) items = [];
        const subtotal = items.reduce((acc, item) => {
            const qty = Number(item.quantity) || 0;
            const price = Number(item.price ?? item.unit_price) || 0;
            return acc + qty * price;
        }, 0);
        const taxAmount = (subtotal * Number(taxPercent || 0)) / 100;
        const total = subtotal + taxAmount + Number(shippingFee || 0);
        return { subtotal, taxAmount, total };
    },

    // Prepare payload expected by backend (snake_case)
    prepareSaleOrderPayload(formData = {}) {
        const items = Array.isArray(formData.items) ? formData.items : [];
        return {
            customer_name: (formData.customer_name || '').trim(),
            order_date: formData.order_date ? new Date(formData.order_date).toISOString() : undefined,
            shipping_address: (formData.shipping_address || '').trim(),
            shipping_provider: (formData.shipping_provider || '').trim(),
            shipping_fee: Number(formData.shipping_fee) || 0,
            tax: Number(formData.tax) || 0,
            items: items.map((item) => ({
                name: (item.name || '').trim(),
                quantity: Number(item.quantity) || 0,
                price: Number(item.unit_price ?? item.price) || 0,
            })),
        };
    },
};

export default saleOrderService;
