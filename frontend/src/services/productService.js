//src/services/productService.js 
// reusable productApi.js 

/* GET all */
/* GET by ID */
/* CREATE */
/* UPDATE */
/* DELETE */
/* Auto-handled JSON + errors */
/* Exported functions */

import * as productApi from '../api/products';

/* Get all product */
export const getAllProducts = async () => {
    try {
        const response = await productApi.fetchProducts();
        return response.data;
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw error;
    }
};

/* Get product by ID */
export const getProductById = async (id) => {
    try {
        const response = await productApi.fetchProductById(id);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch product with id ${id}:`, error);
        throw error;
    }
};

/* Create new product */
export const createProduct = async (productData) => {
    try {   
        const response = await productApi.createProduct(productData);
        return response.data;
    } catch (error) {
        console.error('Failed to create product:', error);
        throw error;
    }
};

/* Update existing product */
export const updateProduct = async (id, productData) => {
    try {
        const response = await productApi.updateProduct(id, productData);
        return response.data;
    } catch (error) {
        console.error(`Failed to update product with id ${id}:`, error);
        throw error;
    }
};
/* Delete product */
export const removeProduct = async (id) => {
    try {           
        const response = await productApi.deleteProduct(id);
        return response.data;
    } catch (error) {
        console.error(`Failed to delete product with id ${id}:`, error);
        throw error;
    }
};
/* Export all service functions */
export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    removeProduct
};


    