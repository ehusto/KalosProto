// File: src/components/CustomerCard.js

import React from "react";
import { Link } from "react-router-dom";
import { formatPhoneNumber } from "../utils/formatting"; // Import our formatting function
import "./CustomerCard.css"; // This should point to your swoop CSS file

function CustomerCard({ customer }) {
  if (!customer) {
    return (
      <div className="customer-card">
        <div className="customer-card-body">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Use the helper function to format the phone number
  const formattedPhone = formatPhoneNumber(customer.phone);

  return (
    <Link to={`/customers/${customer._id}`} className="customer-card">
      {/* --- THE SWOOP HEADER --- */}
      <div className="customer-card-swoop">
        <h3>{customer.name}</h3>
      </div>

      {/* --- THE CARD BODY --- */}
      <div className="customer-card-body">
        <p>
          <strong>Phone:</strong> {formattedPhone || "N/A"}
        </p>
      </div>
    </Link>
  );
}

export default CustomerCard;
