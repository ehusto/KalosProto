// File: src/pages/customers/CustomerDetailPage.js

import React from "react";
import { useParams, Link } from "react-router-dom";
import { useCustomers } from "../../context/CustomerContext";

function CustomerDetailPage() {
  const { customers } = useCustomers();
  const { id } = useParams();
  const customer = customers.find((c) => c._id === id);

  if (!customer) {
    return (
      <div className="page-content customers-background">
        <h2>Customer not found!</h2>
        <Link to="/customers">← Back to Customer List</Link>
      </div>
    );
  }

  // --- THIS IS THE KEY CHANGE ---
  // Safely access the address object and its properties.
  // The "?." is "optional chaining" - it prevents errors if 'address' doesn't exist.
  const street = customer.address?.street || "N/A";
  const city = customer.address?.city || "N/A";
  const state = customer.address?.state || "N/A";
  const zip = customer.address?.zip || "N/A";

  const detailCardStyles = {
    textAlign: "left",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  return (
    <div className="page-content customers-background">
      <div style={detailCardStyles}>
        <h1>{customer.name}</h1>
        <p>
          <strong>Company:</strong> {customer.company}
        </p>
        <p>
          <strong>Email:</strong> {customer.email}
        </p>
        <p>
          <strong>Phone:</strong> {customer.phone}
        </p>

        {/* --- DISPLAY THE STRUCTURED ADDRESS --- */}
        <h4>Address</h4>
        <p>
          {street}
          <br />
          {city}, {state} {zip}
        </p>

        <hr />
        <Link to="/customers">← Back to Customer List</Link>
      </div>
    </div>
  );
}

export default CustomerDetailPage;
