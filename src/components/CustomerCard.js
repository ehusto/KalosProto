// File: src/components/CustomerCard.js
import React from "react";
import { Link } from "react-router-dom";
import "./CustomerCard.css"; // Import the new styles

// We receive the full customer object as a "prop"
function CustomerCard({ customer }) {
  return (
    // The entire card is a link to the customer's specific detail page
    <Link to={`/customers/${customer.id}`} className="customer-card">
      <h3>{customer.name}</h3>
      <p>
        <strong>Company:</strong> {customer.company}
      </p>
    </Link>
  );
}

export default CustomerCard;
