// src/api/saleOrderApi.js

import axiosClient from "./axiosClient";

const ENDPOINT = "/sale-orders";

const cleanParams = (params = {}) =>
    Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== "" && v !== null && v !== undefined)
    );

const buildPath = (...parts) =>
    [ENDPOINT, ...parts.filter((p) => p !== undefined && p !== null)].map(encodeURIComponent).join("/");

const ensureId = (id, name = "id") => {
    if (id === undefined || id === null || id === "") {
        throw new Error(`Missing required ${name}`);
    }
};

const saleOrderApi = {
    // GET /sale-orders?...
    getAll: (params = {}, config = {}) =>
        axiosClient.get(ENDPOINT, { params: cleanParams(params), ...config }),

    // GET /sale-orders/:id
    getById: (id, config = {}) => {
        ensureId(id);
        return axiosClient.get(buildPath(id), config);
    },

    // POST /sale-orders
    create: (data, config = {}) => axiosClient.post(ENDPOINT, data, config),

    // PUT /sale-orders/:id
    update: (id, data, config = {}) => {
        ensureId(id);
        return axiosClient.put(buildPath(id), data, config);
    },

    // DELETE /sale-orders/:id
    delete: (id, config = {}) => {
        ensureId(id);
        return axiosClient.delete(buildPath(id), config);
    },

    /* ORDER ITEMS */
    getItems: (orderId, config = {}) => {
        ensureId(orderId, "orderId");
        return axiosClient.get(buildPath(orderId, "items"), config);
    },

    addItem: (orderId, itemData, config = {}) => {
        ensureId(orderId, "orderId");
        return axiosClient.post(buildPath(orderId, "items"), itemData, config);
    },

    updateItem: (orderId, itemId, itemData, config = {}) => {
        ensureId(orderId, "orderId");
        ensureId(itemId, "itemId");
        return axiosClient.put(buildPath(orderId, "items", itemId), itemData, config);
    },

    deleteItem: (orderId, itemId, config = {}) => {
        ensureId(orderId, "orderId");
        ensureId(itemId, "itemId");
        return axiosClient.delete(buildPath(orderId, "items", itemId), config);
    },

    /* ORDER STATUS WORKFLOW */
    updateStatus: (id, status, config = {}) => {
        ensureId(id);
        return axiosClient.put(buildPath(id, "status"), { status }, config);
    },

    confirmOrder: (id, config = {}) => {
        ensureId(id);
        return axiosClient.post(buildPath(id, "confirm"), null, config);
    },

    /* SHIPPING / DELIVERY */
    shipOrder: (id, shippingData, config = {}) => {
        ensureId(id);
        return axiosClient.post(buildPath(id, "ship"), shippingData, config);
    },

    deliverOrder: (id, deliveryData, config = {}) => {
        ensureId(id);
        return axiosClient.post(buildPath(id, "deliver"), deliveryData, config);
    },

    completeOrder: (id, config = {}) => {
        ensureId(id);
        return axiosClient.post(buildPath(id, "complete"), null, config);
    },

    /* DISCOUNTS & TAXES */
    applyDiscount: (id, discountData, config = {}) => {
        ensureId(id);
        return axiosClient.put(buildPath(id, "discount"), discountData, config);
    },

    applyTaxes: (id, taxData, config = {}) => {
        ensureId(id);
        return axiosClient.put(buildPath(id, "taxes"), taxData, config);
    },

    /* PAYMENTS */
    makePayment: (id, paymentData, config = {}) => {
        ensureId(id);
        return axiosClient.post(buildPath(id, "pay"), paymentData, config);
    },

    getPayments: (id, config = {}) => {
        ensureId(id);
        return axiosClient.get(buildPath(id, "payments"), config);
    },

    refundPayment: (id, refundData, config = {}) => {
        ensureId(id);
        return axiosClient.post(buildPath(id, "refund"), refundData, config);
    },
};

export default saleOrderApi;
