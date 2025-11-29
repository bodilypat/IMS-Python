//src/services/purchaseOrderService.js 

import purchaseOrderApi from '../api/purchaseOrderApi';
import inventoryApi from '../api/inventoryApi';

/* Purchase Order Service */
/* Handles business logic for: */
/* Purchase Orders CRUD */
/* Inventory Lookup */
/* Combining API data */

const purchaseOrderService = {
    /* PURCHASE ORDERS */
    async getPurchaseOrders(params = {}, config = {}) {
        try {
            const response = await purchaseOrderApi.fetchPurchaseOrders(params, config);        
            return response.data;
        } catch (error) {
            console.error('Error fetching purchase orders:', error);
            throw error;
        }
    },

    async getPurchaseOrderById(orderId, config = {}) {
        try {
            const { data } = await purchaseOrderApi.fetchPurchaseOrderById(orderId, config);
            /* Optionally fetch items and received items for details */
            const [itemRes, receivedRes] = await Promise.all([
                purchaseOrderApi.fetchPurchaseOrderItems(orderId, config),
                purchaseOrderApi.fetchReceivedItems(orderId, config),
            ]);
            data.items = itemRes.data;
            data.receivedItems = receivedRes.data;  
            return data;
        } catch (error) {
            console.error(`Error fetching purchase order with ID ${orderId}:`, error);
            throw error;
        }
    },

    async createPurchaseOrder(orderData, config = {}) {
        try {
            const { data } = await purchaseOrderApi.createPurchaseOrder(orderData, config);         
            return data;
        } catch (error) {
            console.error('Error creating purchase order:', error);
            throw error;
        }
    },

    async updatePurchaseOrder(orderId, orderData, config = {}) {
        try {
            const { data } = await purchaseOrderApi.updatePurchaseOrder(orderId, orderData, config);        
            return data;
        } catch (error) {
            console.error(`Error updating purchase order with ID ${orderId}:`, error);
            throw error;
        }
    },
    async deletePurchaseOrder(orderId, config = {}) {
        try {
            const { data } = await purchaseOrderApi.deletePurchaseOrder(orderId, config);
            return data;
        } catch (error) {
            console.error(`Error deleting purchase order with ID ${orderId}:`, error);
            throw error;
        }
    },

    /* INVENTORY LOOKUPS */
    async getInventoryItems(params = {}, config = {}) {
        try {
            const response = await inventoryApi.fetchInventoryItems(params, config);
            return response.data;
        } catch (error) {
            console.error('Error fetching inventory items:', error);
            throw error;
        }
    },
    async getInventoryItemById(itemId, config = {}) {
        try {
            const response = await inventoryApi.fetchInventoryItemById(itemId, config);
            return response.data;
        } catch (error) {
            console.error(`Error fetching inventory item with ID ${itemId}:`, error);
            throw error;
        }
    },

    /* ADDITIONAL BUSINESS METHODS */
    //Update PO Status (Approved, Received, Cancelled, etc.)
    async updatePurchaseOrderStatus(orderId, status, config = {}) {
        try {
            const { data } = await purchaseOrderApi.updateStatus(orderId, status, config);
            return data;
        } catch (error) {
            console.error(`Error updating status for purchase order with ID ${orderId}:`, error);
            throw error;
        }
    },

    /* Receive items for a purchase order */
    async receivePurchaseOrderItems(orderId, receivedData, config = {}) {
        try {
            const { data } = await purchaseOrderApi.receiveItems(orderId, receivedData, config);
            return data;
        } catch (error) {
            console.error(`Error receiving items for purchase order with ID ${orderId}:`, error);
            throw error;
        }
    },

};

export default purchaseOrderService;