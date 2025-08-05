// File: src/components/CustomerCard.js
import React from "react";
import { Link } from "react-router-dom";
import "./CustomerCard.css";

function CustomerCard({ customer }) {
  return (
    // --- THIS IS THE KEY CHANGE ---
    // The link now uses customer._id to build the URL.
    <Link to={`/customers/${customer._id}`} className="customer-card">
      <h3>{customer.name}</h3>
      <p>
        <strong>Company:</strong> {customer.company}
      </p>
    </Link>
  );
}

export default CustomerCard;
