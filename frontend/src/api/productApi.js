//src/api/productApi.js 

const API_BASE_URL = 'http://localhost:8000/api';

/* Handle API response */
async function handleResponse(response) {
    if (!response.ok) {
        const errorData = await response.json();
        const error = new Error(errorData.message || 'API Error');
        error.status = response.status;
        throw error;
    }
    return response.json();
};

/* Fetch all products */
export async function fetchProducts() {
    const response = await fetch(`${API_BASE_URL}/products/`);
    return handleResponse(response);
}

/* Fetch product by ID  */
export async function fetchProductById(productId) {
    const response = await fetch(`${API_BASE_URL}/products/${productId}/`);
    return handleResponse(response);
}

/* Create new product */
export async function createProduct(productData) {
    const response = await fetch(`${API_BASE_URL}/products/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    });
    return handleResponse(response);
}

/* Update existing product */
export async function updateProduct(productId, productData) {
    const response = await fetch(`${API_BASE_URL}/products/${productId}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    });
    return handleResponse(response);
}

/* Delete product */
export async function deleteProduct(productId) {
    const response = await fetch(`${API_BASE_URL}/products/${productId}/`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const errorData = await response.json();
        const error = new Error(errorData.message || 'API Error');
        error.status = response.status;
        throw error;
    }
    return true;
};




