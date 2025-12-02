//src/api/purchaseOrderApi.js 

/* CRUD operation */
/* Fetching PO items */
/* Adding/removing / updating PO items */
/* Receiving items */
/* Status updates */
/* Pagination + filtering */
/* Upload attachment(optional) */

import axiosClient from "../axiosClient";

const BASE = "/purchase-orders";

/* Utility: Build URLs */
const url = {
    root: () = BASE,
    byId: (id) => `${BASE}/${id}`,
    items: (id) => `${BASE}/${id}/items`,
    itemById: (orderId, itemId) => `${BASE}/${orderId}/items/${itemId}`,
    receive: (orderId) => `${BASE}/${orderId}/receive`,
    receiveItems: (orderId) => `${BASE}/${orderId}/receive`,
    receivedItemById: (orderId, receivedItemId) => `${BASE}/${orderId}/received-items/${receivedItemId}`,
    status: (id) => `${BASE}/${id}/status`,
    action: (id, action) => `${BASE}/${id}/${action}`,
    report: () => `${BASE}/report`,
    attactments: (id) => `${BASE}/${id}/attachments`,
};

/* Main API Object */
const purchaseOrderApi = {
    /* CRUD OPERATIONS */
    
    //GET / purchase-orders?status=&supplierId=&page=&limit=
    getAll: (params = {}, config = {}) => {
        const url = url.root();
        return axiosClient.get(url, { params, ...config });
    },

    //GET / purchase-orders/:id
    getById: (id, config = {}) => {
        const url = url.byId(id);
        return axiosClient.get(url, config);
    },

    //POST / purchase-orders
    create: (data, config = {}) => {
        const url = url.root();
        return axiosClient.post(url, data, config);
    },

    //PUT / purchase-orders/:id
    update: (id, data, config = {}) => {
        const url = url.byId(id);
        return axiosClient.put(url, data, config);
    },

    //DELETE / purchase-orders/:id
    delete: (id, config = {}) => {
        const url = url.byId(id);
        return axiosClient.delete(url, config);
    },

    /* PURCHASE ORDER ITEMS */ 

    //GET / purchase-orders/:id/items
    getItems: (orderId, config = {}) => {
        const url = url.items(orderId);
        return axiosClient.get(url, config);
    },

    //POST / purchase-orders/:id/items
    addItem: (id, data, config = {}) => {
        const url = url.items(id);
        return axiosClient.post(url, data, config);
    },

    //PUT / purchase-orders/:orderId/items/:itemId
    updateItem: (orderId, itemId, data, config = {}) => {
        const url = url.itemById(orderId, itemId);
        return axiosClient.put(url, data, config);
    },

    //DELETE / purchase-orders/:orderId/items/:itemId
    deleteItem: (orderId, itemId, config = {}) => {
        const url = url.itemById(orderId, itemId);
        return axiosClient.delete(url, config);
    },

    /* RECEIVING (GRN-lite) */

    //POST / purchase-orders/:orderId/receive
    receiveItems: (orderId, data, config = {}) => {
        const url = url.receive(orderId);
        return axiosClient.post(url, data, config);
    },

    //GET / purchase-orders/:orderId/received-items
    getReceivedItems: (orderId, config = {}) => {
        const url = url.receivedItems(orderId);
        return axiosClient.get(url, config);        
    },

    //GET / purchase-orders/:orderId/received-items/:receivedItemId
    getReceivedItemById: (orderId, receivedItemId, config = {}) => {
        const url = url.receivedItemById(orderId, receivedItemId);
        return axiosClient.get(url, config);
    },

    //DELETE / purchase-orders/:orderId/received-items/:receivedItemId
    deleteReceivedItem: (orderId, receivedItemId, config = {}) => {
        const url = url.receivedItemById(orderId, receivedItemId);
        return axiosClient.delete(url, config);             
    },

    //GET / purchase-orders/report?startDate=&endDate=
    generateReport: (params) => {
        const url = `${ENDPOINT}/report`;
        return axiosClient.get(url, { params });
    },

    /* Status Update */
    //PUT / purchase-orders/:id/status
    updateStatus: (id, status) => {
        const url = `${ENDPOINT}/${id}/status`;
        return axiosClient.put(url, { status });
    },

    //PUT / purchase-orders/:id/cancel
    cancelOrder: (id) => {
        const url = `${ENDPOINT}/${id}/cancel`;
        return axiosClient.put(url);
    },

    //PUT / purchase-orders/:id/complete
    completeOrder: (id) => {
        const url = `${ENDPOINT}/${id}/complete`;
        return axiosClient.put(url);
    },  

    //PUT / purchase-orders/:id/close
    closeOrder: (id) => {
        const url = `${ENDPOINT}/${id}/close`;
        return axiosClient.put(url);
    },

    //PUT / purchase-orders/:id/reopen
    reopenOrder: (id) => {
        const url = `${ENDPOINT}/${id}/reopen`;
        return axiosClient.put(url);
    },

    //PUT / purchase-orders/:id/approve
    approveOrder: (id) => {
        const url = `${ENDPOINT}/${id}/approve`;
        return axiosClient.put(url);
    },

    //PUT / purchase-orders/:id/reject
    rejectOrder: (id) => {
        const url = `${ENDPOINT}/${id}/reject`;
        return axiosClient.put(url);
    },

};
export default productApi;

