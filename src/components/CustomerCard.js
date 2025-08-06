// File: src/components/CustomerCard.js

import React from "react";
import { Link } from "react-router-dom";
import "./CustomerCard.css"; // Make sure it's pointing to the correct, updated CSS

function CustomerCard({ customer }) {
  // Defensive check for loading or missing data
  if (!customer) {
    return (
      <div className="customer-card">
        <div className="customer-card-body">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    // The entire card is a link to the customer's detail page
    <Link to={`/customers/${customer._id}`} className="customer-card">
      {/* --- THE SWOOP HEADER --- */}
      {/* The customer's name now goes inside the swoop */}
      <div className="customer-card-swoop">
        <h3>{customer.name}</h3>
      </div>

      {/* --- THE CARD BODY --- */}
      {/* The phone number is now displayed in the body */}
      <div className="customer-card-body">
        <p>
          <strong>Phone:</strong> {customer.phone || "N/A"}
        </p>
      </div>
    </Link>
  );
}

export default CustomerCard;
