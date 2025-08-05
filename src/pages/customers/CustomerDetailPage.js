// File: src/pages/customers/CustomerDetailPage.js

import React from "react";
import { useParams, Link } from "react-router-dom";
import { useCustomers } from "../../context/CustomerContext"; // <-- IMPORT our custom hook

// This component no longer accepts any props.
function CustomerDetailPage() {
  // --- THIS IS A KEY CHANGE ---
  // We get the 'customers' list directly from the context.
  const { customers } = useCustomers();

  // We get the 'id' from the URL parameter, e.g., /customers/some_id_123
  const { id } = useParams();

  // Find the specific customer from the master list whose _id matches the id from the URL.
  const customer = customers.find((c) => c._id === id);

  // If the customer isn't found (e.g., bad URL), show a "not found" message.
  if (!customer) {
    return (
      <div className="page-content customers-background">
        <h2>Customer not found!</h2>
        <Link to="/customers">← Back to Customer List</Link>
      </div>
    );
  }

  // Define some styles just for the white detail card itself.
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
    // Use the global 'page-content' and 'customers-background' classes for the page layout
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
        <p>
          <strong>Address:</strong> {customer.address}
        </p>
        <hr />
        <Link to="/customers">← Back to Customer List</Link>
      </div>
    </div>
  );
}

export default CustomerDetailPage;
