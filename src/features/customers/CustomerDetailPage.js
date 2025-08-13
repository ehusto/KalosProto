// File: src/pages/customers/CustomerDetailPage.js

import React from "react";
import { useParams, Link } from "react-router-dom";
import { useCustomers } from "./CustomerContext";
import { formatPhoneNumber } from "../../utils/formatting"; // <-- IMPORT THE FORMATTING FUNCTION

function CustomerDetailPage() {
  const { customers } = useCustomers();
  const { id } = useParams();

  if (customers.length === 0) {
    return (
      <div className="page-content customers-background">
        <h2>Loading...</h2>
      </div>
    );
  }

  const customer = customers.find((c) => c._id === id);

  if (!customer) {
    return (
      <div className="page-content customers-background">
        <h2>Customer not found!</h2>
        <Link to="/customers">← Back to Customer List</Link>
      </div>
    );
  }

  // --- USE THE HELPER FUNCTION HERE AS WELL ---
  const formattedPhone = formatPhoneNumber(customer.phone);

  const detailCardStyles = {
    textAlign: "left",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const street = customer.address?.street || "N/A";
  const city = customer.address?.city || "N/A";
  const state = customer.address?.state || "N/A";
  const zip = customer.address?.zip || "N/A";

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

        {/* --- DISPLAY THE FORMATTED PHONE NUMBER --- */}
        <p>
          <strong>Phone:</strong> {formattedPhone}
        </p>

        <hr />
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
