import axios from "axios";

const API_BASE = "http://localhost:5000/api/purchases.php"; // adjust to your backend endpoint

const purchaseApi = {
  // Fetch all purchases
  getAll: async () => {
    try {
      const response = await axios.get(API_BASE);
      return response.data;
    } catch (error) {
      console.error("Error fetching purchases:", error);
      throw error;
    }
  },

  // Fetch single purchase by ID
  getById: async (purchase_id) => {
    try {
      const response = await axios.get(`${API_BASE}?id=${purchase_id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching purchase ID ${purchase_id}:`, error);
      throw error;
    }
  },

  // Create a new purchase
  create: async (purchaseData) => {
    try {
      const response = await axios.post(API_BASE, purchaseData);
      return response.data;
    } catch (error) {
      console.error("Error creating purchase:", error);
      throw error;
    }
  },

  // Update existing purchase
  update: async (purchase_id, purchaseData) => {
    try {
      const response = await axios.put(`${API_BASE}?id=${purchase_id}`, purchaseData);
      return response.data;
    } catch (error) {
      console.error(`Error updating purchase ID ${purchase_id}:`, error);
      throw error;
    }
  },

  // Delete purchase
  delete: async (purchase_id) => {
    try {
      const response = await axios.delete(`${API_BASE}?id=${purchase_id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting purchase ID ${purchase_id}:`, error);
      throw error;
    }
  },
};

export default purchaseApi;
