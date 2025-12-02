//src/api/suppliersApi.js 

/* CRUD operations for suppliers */
/* Filter & pagination  */
/* Managing supplier contacts */
/* Uploading documents (optional) */
/* Status updates */

import axiosClient from "./axiosClient";

const ENDPOINT = "/suppliers";

const suppliersApi = {
    //GET /suppliers?name=&status=&page=&limit=
    getAll: (params) => {
        const url = ENDPOINT;
        return axiosClient.get(url, { params });
    },

    //GET /suppliers/:id
    getById: (id) => {
        const url = `${ENDPOINT}/${id}`;
        return axiosClient.get(url);
    },

    //POST /suppliers
    create: (data) => {
        const url = ENDPOINT;
        return axiosClient.post(url, data);
    },
    //PUT /suppliers/:id
    update: (id, data) => {
        const url = `${ENDPOINT}/${id}`;
        return axiosClient.put(url, data);
    },

    //DELETE /suppliers/:id
    delete: (id) => {
        const url = `${ENDPOINT}/${id}`;
        return axiosClient.delete(url);
    },

    /* STATUS */

    // PUT /suppliers/:id/activate
    activate: (id) => {
        const url = `${ENDPOINT}/${id}/activate`;
        return axiosClient.put(url);
    },

    // PUT /suppliers/:id/deactivate
    deactivate: (id) => {
        const url = `${ENDPOINT}/${id}/deactivate`;
        return axiosClient.put(url);
    },

    //PATCH /suppliers/:id/status
    updateStatus: (id, status) => {
        const url = `${ENDPOINT}/${id}/status`;
        return axiosClient.patch(url, { status });
    },

    /* CONTACTS PERSONS */

    //GET /suppliers/:id/contacts
    getContacts: (id) => {
        const url = `${ENDPOINT}/${id}/contacts`;
        return axiosClient.get(url);
    };

    //POST /suppliers/:id/contacts
    addContact: (id, data) => {
        const url = `${ENDPOINT}/${id}/contacts`;
        return axiosClient.post(url, data);
    },

    //PUT /suppliers/:supplierId/contacts/:contactId
    updateContact: (supplierId, contactId, data) => {
        const url = `${ENDPOINT}/${supplierId}/contacts/${contactId}`;
        return axiosClient.put(url, data);
    },  

    //DELETE /suppliers/:supplierId/contacts/:contactId
    deleteContact: (supplierId, contactId) => {
        const url = `${ENDPOINT}/${supplierId}/contacts/${contactId}`;
        return axiosClient.delete(url);
    },  

    /* DOCUMENTS (Optional) */

    //POST /suppliers/:id/upload
    uploadDocument: (id, data) => {
        const url = `${ENDPOINT}/${id}/upload`; 
        return axiosClient.post(url, data);
    },

    //GET /suppliers/:id/documents
    getDocuments: (id) => {
        const url = `${ENDPOINT}/${id}/documents`;
        return axiosClient.get(url);
    },
};
export default suppliersApi;

