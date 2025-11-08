//src/services/reportService.js 

import api from "./api";

/* Handle all analytcs-related API calls for the dashboard and report section */
const reportService = {
    /* get overall summary (sales, taock value, turnover) */
    getSummary: async () => {
        const { data }  = await api.get("/reports/summary");
        return data;
    },

    /* Ge sales trend data */
    getSalesTrand: async (param = {}) => {
        const { data } = await api.get("/reports/sales-trend", { param });
        return data;
    },

    /* Get top-selling products */
    getTopProducts: async (params = {}) => {
        const { data } = await api.get("/reports/top-products", { params });
        return data;
    }

    /* Get low-stock or critical inventory items */
    getLowStock: async () => {
        const { data } = await api.get("/reports/category-sales");
        return data;
    },

    /* Get category-wise sales (for Pie/Bar chart) */
    getcategorySales: async () => {
        const { data } = await api.get("/reports/scategory-sales");
        return data;
    },

    /* Export report (PDF or Excell) */
    exportReport: async (type = "pdf") => {
        const response = await api.get(`/reports/export?type=${type}`, {
            responseType: "blob", // handle file downloads 
        });

        /* Download fiel directly in browser */
        const blob = new Blob([response, data], { type: type === "pdf" ? "applications/pdf" : "application/vnd.ms-excell"});
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `report.${type === "pdf" ? "pdf" : "elsx"}`;
        link.click();
    },
};

export default reportService;


