// src/api/userApi.js
/**
 * User API wrapper around axiosClient.
 * - All methods return the axios promise (caller handles .then/.catch or await).
 * - Optional `config` parameter is accepted for axios request config (headers, signal, etc).
 */

import axiosClient from "./axiosClient";

const ENDPOINT = "/users";

const buildUrl = (...parts) =>
    parts
        .join("/")
        .replace(/\/+/g, "/") // remove duplicate slashes
        .replace(/\/$/, ""); // remove trailing slash

const ensureId = (id) => {
    if (id === undefined || id === null || id === "") {
        throw new TypeError("The parameter `id` is required.");
    }
};

const userApi = {
    /**
     * POST /users/login
     * credentials = { email, password }
     */
    login: (credentials, config) =>
        axiosClient.post(buildUrl(ENDPOINT, "login"), credentials, config),

    /**
     * POST /users/register
     * data = { name, email, password }
     */
    register: (data, config) =>
        axiosClient.post(buildUrl(ENDPOINT, "register"), data, config),

    /**
     * GET /users/profile
     */
    getProfile: (config) => axiosClient.get(buildUrl(ENDPOINT, "profile"), config),

    /**
     * PUT /users/profile
     * data = { name?, email?, password? }
     */
    updateProfile: (data, config) =>
        axiosClient.put(buildUrl(ENDPOINT, "profile"), data, config),

    /* USER MANAGEMENT (Admins / Managers) */

    /**
     * GET /users?role=&page=&limit=
     * params = { role?, page?, limit?, search?, ... }
     */
    getAll: (params = {}, config = {}) =>
        axiosClient.get(ENDPOINT, { params, ...config }),

    /**
     * GET /users/:id
     */
    getById: (id, config) => {
        ensureId(id);
        return axiosClient.get(buildUrl(ENDPOINT, id), config);
    },

    /**
     * POST /users
     * data = { name, email, password, role }
     */
    create: (data, config) => axiosClient.post(ENDPOINT, data, config),

    /**
     * PUT /users/:id
     * data = { name?, email?, password?, role? }
     */
    update: (id, data, config) => {
        ensureId(id);
        return axiosClient.put(buildUrl(ENDPOINT, id), data, config);
    },

    /**
     * DELETE /users/:id
     */
    delete: (id, config) => {
        ensureId(id);
        return axiosClient.delete(buildUrl(ENDPOINT, id), config);
    },

    /* ROLE / STATUS */

    /**
     * PUT /users/:id/role
     * role = 'admin' | 'manager' | 'staff'
     */
    updateRole: (id, role, config) => {
        ensureId(id);
        return axiosClient.put(buildUrl(ENDPOINT, id, "role"), { role }, config);
    },

    /**
     * PUT /users/:id/status
     * status = 'active' | 'inactive'
     */
    updateStatus: (id, status, config) => {
        ensureId(id);
        return axiosClient.put(buildUrl(ENDPOINT, id, "status"), { status }, config);
    },

    /* PASSWORD OPERATIONS */

    /**
     * POST /users/forgot-password
     * payload = { email }
     */
    forgotPassword: (email, config) =>
        axiosClient.post(buildUrl(ENDPOINT, "forgot-password"), { email }, config),

    /**
     * POST /users/reset-password
     * payload = { token, newPassword }
     */
    resetPassword: (token, newPassword, config) =>
        axiosClient.post(
            buildUrl(ENDPOINT, "reset-password"),
            { token, newPassword },
            config
        ),
};

export default userApi;