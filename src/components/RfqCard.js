// File: src/components/RfqCard.js

import React from "react";
import { Link } from "react-router-dom";
import { useCustomers } from "../features/customers/CustomerContext";
import "./JobCard.css"; // Reuse the JobCard styles

function RfqCard({ rfq }) {
  const { customers } = useCustomers();
  const customer = customers.find((c) => c._id === rfq.customer_id);

  if (!customer) {
    return (
      <div className="job-card">
        <h3>{rfq.rfq_id}</h3>
        <p>Loading customer...</p>
      </div>
    );
  }

  // --- THIS IS THE KEY CHANGE ---
  // A function to determine the color based on the status string.
  const getStatusColor = (status) => {
    switch (status) {
      case "Draft":
        return "#3498db"; // Blue
      case "Won":
        return "#27ae60"; // Green
      case "Lost":
        return "#e74c3c"; // Red
      case "Job Created":
        return "#9b59b6"; // Purple
      case "Archived":
        return "#7f8c8d"; // Grey
      default:
        return "#34495e"; // Dark Slate
    }
  };

  const statusStyle = {
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "0.8rem",
    fontWeight: "bold",
    color: "white",
    backgroundColor: getStatusColor(rfq.status), // Use the function to get the color
  };

  return (
    <Link to={`/rfqs/${rfq._id}`} className="job-card">
      <div className="job-card-swoop">
        <h3>{rfq.rfq_id}</h3>
      </div>
      <div className="job-card-body">
        <p>
          <strong>Customer:</strong> <span>{customer.name}</span>
        </p>
        <p>
          <strong>Salesman:</strong> <span>{rfq.salesman}</span>
        </p>
        <p>
          <strong>Status:</strong> <span style={statusStyle}>{rfq.status}</span>
        </p>
      </div>
    </Link>
  );
}

export default RfqCard;
