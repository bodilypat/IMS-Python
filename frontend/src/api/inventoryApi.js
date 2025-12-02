//src/api/inventoryApi.js

/* Fetching inventory list */
/* Warehouse-level stock management */
/* Stock adjustments */
/* Getting inventory by product or warehouse  */
/* Batch updates (optional) */

import axiosClient from './axiosClient';

const ENDPOINT = '/inventory';

const inventoryApi = {
    /* INVENTORY LIST */

    // GET /inventory?search=&warehouseId=&page=&limit= - Get inventory list with optional filters
    getInventoryList: (params) => {
        const url = `${ENDPOINT}/list`;
        return axiosClient.get(url, { params });
    }

    // GET /inventory/id - Get inventory by ID
    getInventoryById: (id) => {
        const url = `${ENDPOINT}/${id}`;
        return axiosClient.get(url);
    },  

    // GET /inventory/product/:productId - Get inventory by product ID
    getInventoryByProduct: (productId) => {
        const url = `${ENDPOINT}/product/${productId}`;
        return axiosClient.get(url);
    },

    // GET /inventory/warehouse/:warehouseId - Get inventory by warehouse ID
    getInventoryByWarehouse: (warehouseId) => {
        const url = `${ENDPOINT}/warehouse/${warehouseId}`;
        return axiosClient.get(url);
    },

    // POST /inventory/adjust - Adjust stock levels
    adjustStock: (data) => {
        const url = `${ENDPOINT}/adjust`;
        return axiosClient.post(url, data);
    },

    // PUT /inventory/batch-update - Batch update inventory (optional)
    batchUpdateInventory: (data) => {
        const url = `${ENDPOINT}/batch-update`;
        return axiosClient.put(url, data);
    },

};
export default inventoryApi;

