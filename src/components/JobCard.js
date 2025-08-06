// File: src/components/JobCard.js

import React from "react";
// We import Link even though we are not using it yet, preparing for when we build the job detail page.
import { Link } from "react-router-dom";
// We can reuse the same CSS as the customer card for a consistent look.
import "./CustomerCard.css";

function JobCard({ job }) {
  // --- DEFENSIVE PROGRAMMING ---
  // This approach prevents the component from crashing if a piece of data is missing.
  // We check if a property exists before we try to format it, providing a default fallback value if it's missing.

  // Check if job.scheduled_start_date exists before trying to format it.
  const startDate = job.scheduled_start_date
    ? new Date(job.scheduled_start_date).toLocaleTimeString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A"; // Fallback to 'N/A' if the date is not present.

  // Check if job.revenue exists and is a number before trying to format it as currency.
  const revenue =
    typeof job.revenue === "number" ? `$${job.revenue.toFixed(2)}` : "N/A"; // Fallback to 'N/A' if revenue is not a number.

  return (
    // For now, this is just a div. Later, we can wrap it in a <Link> to go to a detail page.
    // Example: <Link to={`/jobs/${job._id}`} className="customer-card"> ... </Link>
    <div className="customer-card">
      {/* We'll figure out how to display the customer's name in a later step */}
      <h3>Job for: [Customer Name]</h3>

      {/* Use the safe variables we created above. Also provide a fallback for other fields. */}
      <p>
        <strong>Salesman:</strong> {job.salesman || "N/A"}
      </p>
      <p>
        <strong>Start Date:</strong> {startDate}
      </p>
      <p>
        <strong>Revenue:</strong> {revenue}
      </p>
      <p>
        <em>Customer ID: {job.customer_id || "N/A"}</em>
      </p>
    </div>
  );
}

export default JobCard;
