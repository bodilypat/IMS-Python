// src/services/api.js 
import axios from "axios";

/* Create axios instance with base URL (adjust for backend) */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:500/api",
    headers: { "content-Type": "application"},
});

/* Automatically attach JWT token to every request */
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = 'Bearer ${token}';
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/* Handle API error & expired token globally */
api.interceptors.reponse.use(
    (response) => response,
    (error) => {
        const { response }= error;
        if (response && response.status === 401) {
            console.warn("session expired or unauthorized access. Logging out...");
            localStorage.clear();
            window.location.href="/login"; // redirect to ligin
        }
        return Promise.reject(response?.data || error.message);
    }
);

export default api;


