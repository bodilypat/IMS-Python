// src/services/SaleOrderService.js

/**
 * SaleOrderService
 * ---------------------------------------------------------------------
 * Wraps saleOrderApi with:
 *  - unified success/error responses
 *  - auto total calculation (subtotal, tax, discount, total)
 *  - normalization of order + items
 *  - convenience workflow methods
 * ---------------------------------------------------------------------
 */

import saleOrderApi from "../api/saleOrderApi";

/* ------------------------------------------------------------
 * Utility helpers
 * ------------------------------------------------------------ */

const toNumber = (v) => (isNaN(Number(v)) ? 0 : Number(v));

const round2 = (n) => Math.round(n * 100) / 100;

/**
 * Calculate totals for an order.
 */
export const calculateTotals = ({ items = [], discount = 0, taxRate = 0, shipping_fee = 0 }) => {
    const subtotal = round2(
        items.reduce((sum, item) => sum + toNumber(item.quantity) * toNumber(item.unit_price), 0)
    );

    const discountAmount = round2((subtotal * toNumber(discount)) / 100);
    const taxableAmount = round2(subtotal - discountAmount);

    const tax = round2((taxableAmount * toNumber(taxRate)) / 100);
    const total = round2(taxableAmount + tax + toNumber(shipping_fee));

    return {
        subtotal,
        discount,
        discount_amount: discountAmount,
        tax,
        tax_rate: taxRate,
        shipping_fee: round2(toNumber(shipping_fee)),
        total_amount: total,
    };
};

/**
 * Normalize order items to ensure shape consistency.
 */
export const normalizeItems = (items = []) =>
    items.map((i) => ({
        id: i.id ?? i.item_id ?? null,
        product_id: i.product_id,
        product_name: i.product_name ?? i.product?.name ?? "",
        quantity: toNumber(i.quantity),
        unit_price: toNumber(i.unit_price),
        total_price: round2(toNumber(i.quantity) * toNumber(i.unit_price)),
    }));

/**
 * Normalize full order from backend.
 */
export const normalizeOrder = (o = {}) => ({
    id: o.id ?? o.sale_order_id,
    sale_number: o.sale_number,
    customer_id: o.customer_id,
    customer_name: o.customer_name ?? o.customer?.name ?? "",
    status: o.status ?? "Pending",
    payment_status: o.payment_status ?? "Pending",
    currency: o.currency ?? "USD",

    items: normalizeItems(o.items),

    subtotal: toNumber(o.subtotal),
    tax: toNumber(o.tax),
    tax_rate: toNumber(o.tax_rate ?? 0),
    discount: toNumber(o.discount ?? 0),
    discount_amount: toNumber(o.discount_amount ?? 0),
    total_amount: toNumber(o.total_amount),
    shipping_fee: toNumber(o.shipping_fee ?? 0),

    order_date: o.order_date,
    expected_delivery_date: o.expected_delivery_date,
    delivered_date: o.delivered_date,

    shipping_address: o.shipping_address ?? "",
    shipping_provider: o.shipping_provider ?? "",
    note: o.note ?? "",
});

/**
 * Wrap API responses in a consistent structure.
 */
const safeRequest = async (fn) => {
    try {
        const res = await fn();
        return {
            success: true,
            data: res.data?.data ?? res.data ?? null,
        };
    } catch (err) {
        return {
            success: false,
            error:
                err?.response?.data?.message ||
                err?.message ||
                "An unexpected error occurred.",
        };
    }
};

/* ------------------------------------------------------------
 * Service functions
 * ------------------------------------------------------------ */

const SaleOrderService = {
    /* ----------------------  Fetching  ---------------------- */

    getSaleOrders: async (params) =>
        safeRequest(() => saleOrderApi.getAll(params)),

    getSaleOrder: async (id) => {
        const res = await safeRequest(() => saleOrderApi.getById(id));
        if (!res.success) return res;

        return {
            ...res,
            data: normalizeOrder(res.data),
        };
    },

    /* ----------------------  Create / Update  ---------------------- */

    /**
     * Build payload for backend.
     * Can be used by Create & Edit pages.
     */
    buildPayload(formData) {
        const items = normalizeItems(formData.items);
        const totals = calculateTotals({
            items,
            discount: formData.discount,
            taxRate: formData.tax_rate,
            shipping_fee: formData.shipping_fee,
        });

        return {
            ...formData,
            items,
            ...totals,
        };
    },

    createSaleOrder: async (data) =>
        safeRequest(() => saleOrderApi.create(data)),

    updateSaleOrder: async (id, data) =>
        safeRequest(() => saleOrderApi.update(id, data)),

    deleteSaleOrder: async (id) =>
        safeRequest(() => saleOrderApi.delete(id)),

    /* ----------------------  Items  ---------------------- */

    addItem: async (orderId, item) =>
        safeRequest(() => saleOrderApi.addItem(orderId, item)),

    updateItem: async (orderId, itemId, item) =>
        safeRequest(() => saleOrderApi.updateItem(orderId, itemId, item)),

    deleteItem: async (orderId, itemId) =>
        safeRequest(() => saleOrderApi.deleteItem(orderId, itemId)),

    /* ----------------------  Workflow (Status)  ---------------------- */

    confirm: async (id) =>
        safeRequest(() => saleOrderApi.confirmOrder(id)),

    ship: async (id, data) =>
        safeRequest(() => saleOrderApi.shipOrder(id, data)),

    deliver: async (id, data) =>
        safeRequest(() => saleOrderApi.deliverOrder(id, data)),

    complete: async (id) =>
        safeRequest(() => saleOrderApi.completeOrder(id)),

    updateStatus: async (id, status) =>
        safeRequest(() => saleOrderApi.updateStatus(id, status)),

    /* ----------------------  Discount / Taxes  ---------------------- */

    applyDiscount: async (id, discountData) =>
        safeRequest(() => saleOrderApi.applyDiscount(id, discountData)),

    applyTaxes: async (id, taxData) =>
        safeRequest(() => saleOrderApi.applyTaxes(id, taxData)),

    /* ----------------------  Payments  ---------------------- */

    makePayment: async (id, paymentData) =>
        safeRequest(() => saleOrderApi.makePayment(id, paymentData)),

    getPayments: async (id) =>
        safeRequest(() => saleOrderApi.getPayments(id)),

    refund: async (id, refundData) =>
        safeRequest(() => saleOrderApi.refundPayment(id, refundData)),
};

export default SaleOrderService;
