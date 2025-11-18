//src/components/forms/ProductForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductForm = ({ product = null, onSuccess }) => {
  const [formData, setFormData] = useState({
    sku: "",
    product_name: "",
    description: "",
    cost_price: 0,
    sale_price: 0,
    quantity: 0,
    category_id: "",
    vendor_id: "",
    status: "Available",
    product_image_url: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Populate form when editing a product
  useEffect(() => {
    if (product) {
      setFormData({ ...formData, ...product });
    }
  }, [product]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (product) {
        // Edit existing product
        await axios.put(`/api/products.php?id=${product.product_id}`, formData);
      } else {
        // Add new product
        await axios.post("/api/products.php", formData);
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error saving product:", err);
      setError("Failed to save product. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label htmlFor="sku" className="form-label">
          SKU
        </label>
        <input
          type="text"
          className="form-control"
          id="sku"
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="product_name" className="form-label">
          Product Name
        </label>
        <input
          type="text"
          className="form-control"
          id="product_name"
          name="product_name"
          value={formData.product_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        ></textarea>
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <label htmlFor="cost_price" className="form-label">
            Cost Price
          </label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="cost_price"
            name="cost_price"
            value={formData.cost_price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="sale_price" className="form-label">
            Sale Price
          </label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="sale_price"
            name="sale_price"
            value={formData.sale_price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
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
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="category_id" className="form-label">
            Category ID
          </label>
          <input
            type="number"
            className="form-control"
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="vendor_id" className="form-label">
            Vendor ID
          </label>
          <input
            type="number"
            className="form-control"
            id="vendor_id"
            name="vendor_id"
            value={formData.vendor_id}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="status" className="form-label">
          Status
        </label>
        <select
          className="form-select"
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Available">Available</option>
          <option value="Out of Stock">Out of Stock</option>
          <option value="Discontinued">Discontinued</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="product_image_url" className="form-label">
          Product Image URL
        </label>
        <input
          type="text"
          className="form-control"
          id="product_image_url"
          name="product_image_url"
          value={formData.product_image_url}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Saving..." : product ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
