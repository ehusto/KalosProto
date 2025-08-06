// File: src/components/JobCard.js

import React from "react";
import { Link } from "react-router-dom";
import "./JobCard.css"; // Make sure it's pointing to the new JobCard.css

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

  return (
    // The Link is the outer container, using the new class name
    <Link to={`/jobs/${job._id}`} className="job-card">
      {/* --- THE SWOOP HEADER --- */}
      {/* The Job ID now goes inside the swoop */}
      <div className="job-card-swoop">
        <h3>{job.job_id || "N/A"}</h3>
      </div>

      {/* --- THE CARD BODY --- */}
      {/* The rest of the details go in the body */}
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
      </div>
    </Link>
  );
}

export default JobCard;
