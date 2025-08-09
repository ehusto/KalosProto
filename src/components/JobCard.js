// File: src/components/JobCard.js

import React from "react";
import { Link } from "react-router-dom";
import "./JobCard.css";

function JobCard({ job, customer }) {
  // Defensive check for loading state
  if (!customer || !job) {
    return (
      <div className="job-card">
        <div className="job-card-body">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const town = job.job_site_address?.city || "N/A";

  // --- THIS IS THE NEW PART ---
  // A helper function to determine the color for the status badge.
  const getStatusColor = (status) => {
    const lowerCaseStatus = status ? status.toLowerCase() : "";
    if (lowerCaseStatus.includes("progress")) return "#f39c12"; // Orange for In Progress
    if (lowerCaseStatus.includes("hold")) return "#e74c3c"; // Red for On Hold
    if (lowerCaseStatus.includes("completed")) return "#3498db"; // Blue for Completed
    if (lowerCaseStatus.includes("invoiced")) return "#9b59b6"; // Purple for Invoiced
    if (lowerCaseStatus.includes("paid")) return "#27ae60"; // Green for Paid
    return "#7f8c8d"; // Grey for Scheduled or anything else
  };

  // Define the style for the status badge using the helper function.
  const statusStyle = {
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "0.8rem",
    fontWeight: "bold",
    color: "white",
    backgroundColor: getStatusColor(job.status),
  };

  return (
    <Link to={`/jobs/${job._id}`} className="job-card">
      <div className="job-card-swoop">
        <h3>{job.job_id || "N/A"}</h3>
      </div>

      <div className="job-card-body">
        <p>
          <strong>Customer:</strong> <span>{customer.name}</span>
        </p>
        <p>
          <strong>Salesman:</strong> <span>{job.salesman}</span>
        </p>
        <p>
          <strong>Town:</strong> <span>{town}</span>
        </p>
        {/* --- ADDED THE STATUS DISPLAY --- */}
        <p>
          <strong>Status:</strong>{" "}
          <span style={statusStyle}>{job.status || "Scheduled"}</span>
        </p>
      </div>
    </Link>
  );
}

export default JobCard;
