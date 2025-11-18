//src/components/PurchaseForm.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const PurchaseForm = ({ purchase = null, onSuccess }) => {
  const [formData, setFormData] = useState({
    item_id: "",
    vendor_id: "",
    purchase_reference: "",
    purchase_date: "",
    unit_price: 0,
    quantity: 1,
    total_price: 0,
    description: "",
    status: "Pending",
  });

  const [items, setItems] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch items and vendors for dropdowns
  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsRes = await axios.get("/api/items.php"); // replace with your items API
        const vendorsRes = await axios.get("/api/vendors.php"); // replace with your vendors API
        setItems(itemsRes.data);
        setVendors(vendorsRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Populate form when editing a purchase
  useEffect(() => {
    if (purchase) {
      setFormData({ ...formData, ...purchase });
    }
  }, [purchase]);

  // Update total price whenever unit price or quantity changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      total_price: (prev.unit_price * prev.quantity).toFixed(2),
    }));
  }, [formData.unit_price, formData.quantity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "unit_price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (purchase) {
        await axios.put(`/api/purchases.php?id=${purchase.purchase_id}`, formData);
      } else {
        await axios.post("/api/purchases.php", formData);
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setError("Failed to save purchase. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label htmlFor="item_id" className="form-label">Item</label>
        <select
          id="item_id"
          name="item_id"
          className="form-select"
          value={formData.item_id}
          onChange={handleChange}
          required
        >
          <option value="">Select an item</option>
          {items.map((item) => (
            <option key={item.item_id} value={item.item_id}>
              {item.item_name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="vendor_id" className="form-label">Vendor</label>
        <select
          id="vendor_id"
          name="vendor_id"
          className="form-select"
          value={formData.vendor_id}
          onChange={handleChange}
          required
        >
          <option value="">Select a vendor</option>
          {vendors.map((vendor) => (
            <option key={vendor.vendor_id} value={vendor.vendor_id}>
              {vendor.vendor_name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="purchase_reference" className="form-label">Purchase Reference</label>
        <input
          type="text"
          className="form-control"
          id="purchase_reference"
          name="purchase_reference"
          value={formData.purchase_reference}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="purchase_date" className="form-label">Purchase Date</label>
        <input
          type="date"
          className="form-control"
          id="purchase_date"
          name="purchase_date"
          value={formData.purchase_date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <label htmlFor="unit_price" className="form-label">Unit Price</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="unit_price"
            name="unit_price"
            value={formData.unit_price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="total_price" className="form-label">Total Price</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="total_price"
            name="total_price"
            value={formData.total_price}
            readOnly
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="status" className="form-label">Status</label>
        <select
          id="status"
          name="status"
          className="form-select"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          rows="3"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Saving..." : purchase ? "Update Purchase" : "Add Purchase"}
      </button>
    </form>
  );
};

export default PurchaseForm;
