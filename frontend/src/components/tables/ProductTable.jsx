import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products.php"); // Adjust API endpoint
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="table-responsive">
      <table
        className="table table-striped table-bordered table-hover"
        style={{ minWidth: "100%" }}
      >
        <thead>
          <tr>
            <th>Product ID</th>
            <th>SKU</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Cost Price</th>
            <th>Sale Price</th>
            <th>Quantity</th>
            <th>Category ID</th>
            <th>Vendor ID</th>
            <th>Status</th>
            <th>Image</th>
            <th>Created On</th>
            <th>Updated On</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.product_id}>
                <td>{product.product_id}</td>
                <td>{product.sku}</td>
                <td>{product.product_name}</td>
                <td>{product.description || "-"}</td>
                <td>${parseFloat(product.cost_price).toFixed(2)}</td>
                <td>${parseFloat(product.sale_price).toFixed(2)}</td>
                <td>{product.quantity}</td>
                <td>{product.category_id || "-"}</td>
                <td>{product.vendor_id}</td>
                <td>{product.status}</td>
                <td>
                  {product.product_image_url ? (
                    <img
                      src={product.product_image_url}
                      alt={product.product_name}
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td>{new Date(product.created_on).toLocaleString()}</td>
                <td>{new Date(product.updated_on).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="13" className="text-center">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
