//src/api/axiosClient.js 

/* Base URL setup */
/* Request interceptor (adds JWT token) */
/* Response interceptor (handles errors) */
/* Automatic token refresh (optional + included) */
/* Centralized error handling */
/* Exported axios instance */

import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:5000/api', // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Include cookies in requests       
    timeout: 10000, // 10 seconds timeout
});

/* REQUEST INTERCEPTOR */
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/* RESPONSE INTERCEPTOR */
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response) {
            // Handle 401 Unauthorized errors
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;  
                try {
                    const refreshToken = localStorage.getItem('refreshToken');
                    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL || 'https://localhost:5000/api'}/auth/refresh`, { token: refreshToken });
                    const newToken = response.data.token;
                    localStorage.setItem('authToken', newToken);
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                    return axiosClient(originalRequest);
                } catch (refreshError) {
                    return Promise.reject(refreshError);
                }
            }

            // Centralized error handling
            console.error('API Error:', error.response.data.message || error.message);
        }
        return Promise.reject(error);
    }
);