import React, { useState, useEffect } from "react";
import axios from "axios";
import PurchaseForm from "../forms/PurchaseForm";

const PurchaseTable = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingPurchase, setEditingPurchase] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch all purchases
  const fetchPurchases = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("/api/purchases.php"); // adjust API endpoint
      setPurchases(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch purchases.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  // Handle edit button click
  const handleEdit = (purchase) => {
    setEditingPurchase(purchase);
    setShowForm(true);
  };

  // Handle delete button click
  const handleDelete = async (purchase_id) => {
    if (!window.confirm("Are you sure you want to delete this purchase?")) return;

    try {
      await axios.delete(`/api/purchases.php?id=${purchase_id}`);
      fetchPurchases(); // Refresh table
    } catch (err) {
      console.error(err);
      alert("Failed to delete purchase.");
    }
  };

  // Handle successful form submission
  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingPurchase(null);
    fetchPurchases();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Purchases</h2>
        <button
          className="btn btn-success"
          onClick={() => {
            setEditingPurchase(null);
            setShowForm(true);
          }}
        >
          Add Purchase
        </button>
      </div>

      {showForm && (
        <div className="mb-4">
          <PurchaseForm purchase={editingPurchase} onSuccess={handleFormSuccess} />
        </div>
      )}

      {loading ? (
        <div>Loading purchases...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Reference</th>
                <th>Date</th>
                <th>Item</th>
                <th>Vendor</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {purchases.length === 0 ? (
                <tr>
                  <td colSpan="11" className="text-center">
                    No purchases found.
                  </td>
                </tr>
              ) : (
                purchases.map((p) => (
                  <tr key={p.purchase_id}>
                    <td>{p.purchase_id}</td>
                    <td>{p.purchase_reference}</td>
                    <td>{p.purchase_date}</td>
                    <td>{p.item_name}</td>
                    <td>{p.vendor_name}</td>
                    <td>{p.unit_price}</td>
                    <td>{p.quantity}</td>
                    <td>{p.total_price}</td>
                    <td>{p.status}</td>
                    <td>{p.description}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(p.purchase_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PurchaseTable;
