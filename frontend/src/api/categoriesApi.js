//src/api/categoriesApi.js 

/* CRUD operations */
/* Nested categories (optional) */
/* Activating / deactivating categories (optional) */
/* Pagination + search (optional) */
/* Category image upload (optional) */

import axiosClient  from './axiosClient';

const ENDPOINT = '/categories';

const categoriesApi = {
    /* BASIC CRUD OPERATIONS */

    // GET /categories?search=&parentId=&page=&limit=
    getAll: (params) => {
        return axiosClient.get(ENDPOINT, { params });
    },

    // GET /categories/:id
    getById: (id) => {
        return axiosClient.get(`${ENDPOINT}/${id}`);
    },

    // POST /categories
    create: (data) => {
        return axiosClient.post(ENDPOINT, data);
    },

    // PUT /categories/:id
    update: (id, data) => {
        return axiosClient.put(`${ENDPOINT}/${id}`, data);
    },

    // DELETE /categories/:id
    delete: (id) => {
        return axiosClient.delete(`${ENDPOINT}/${id}`);
    },

    /* NESTED CATEGORIES (optional) */

    // GET /categories/:id/children
    getChildren: (id) => {
        return axiosClient.get(`${ENDPOINT}/${id}/children`);
    },

    // POST /categories/:id/children
    addChild: (id, data) => {
        return axiosClient.post(`${ENDPOINT}/${id}/children`, data);
    },

    /* ACTIVATING / DEACTIVATING CATEGORIES (optional) */

    // PATCH /categories/:id/activate
    activate: (id) => {
        return axiosClient.patch(`${ENDPOINT}/${id}/activate`);
    },

    // PATCH /categories/:id/deactivate
    deactivate: (id) => {
        return axiosClient.patch(`${ENDPOINT}/${id}/deactivate`);
    },
    /* CATEGORY IMAGE UPLOAD (optional) */
    // POST /categories/:id/upload-image
    uploadImage: (id, imageData) => {
        const formData = new FormData();
        formData.append('image', imageData);

        return axiosClient.post(`${ENDPOINT}/${id}/upload-image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};  
export default categoriesApi;

