// File: src/pages/jobs/JobDetailPage.js

import React from "react";
import { useParams, Link } from "react-router-dom";
import { useJobs } from "../../context/JobContext";
import { useCustomers } from "../../context/CustomerContext";

function JobDetailPage() {
  const { jobs } = useJobs();
  const { customers } = useCustomers();
  const { id } = useParams();

  if (jobs.length === 0 || customers.length === 0) {
    return (
      <div className="page-content jobs-background">
        <h2>Loading Job Data...</h2>
      </div>
    );
  }

  const job = jobs.find((j) => j._id === id);

  if (!job) {
    return (
      <div className="page-content jobs-background">
        <h2>Job not found!</h2>
        <Link to="/jobs">← Back to Job List</Link>
      </div>
    );
  }

  const customer = customers.find((c) => c._id === job.customer_id);

  const startDate = job.scheduled_start_date
    ? new Date(job.scheduled_start_date).toLocaleDateString()
    : "N/A";
  const dueDate = job.due_date
    ? new Date(job.due_date).toLocaleDateString()
    : "N/A";
  const revenue =
    typeof job.revenue === "number" ? `$${job.revenue.toFixed(2)}` : "N/A";
  const street = job.job_site_address?.street || "N/A";
  const city = job.job_site_address?.city || "N/A";
  const state = job.job_site_address?.state || "N/A";
  const zip = job.job_site_address?.zip || "N/A";

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
    <div className="page-content jobs-background">
      <div style={detailCardStyles}>
        <h1>Job Details: {job.job_id}</h1>

        {/* --- ADDED THIS SECTION --- */}
        {job.originating_rfq_id && (
          <p
            style={{
              fontWeight: "bold",
              color: "#7f8c8d",
              marginTop: "-10px",
              marginBottom: "20px",
            }}
          >
            Generated from RFQ: {job.originating_rfq_id}
          </p>
        )}

        <hr />
        <h4>Customer Information</h4>
        <p>
          <strong>Customer:</strong>{" "}
          {customer ? customer.name : `ID: ${job.customer_id}`}
        </p>
        <p>
          <strong>Company:</strong> {customer ? customer.company : "..."}
        </p>
        <hr />
        <h4>Job Information</h4>
        <p>
          <strong>Salesman:</strong> {job.salesman}
        </p>
        <p>
          <strong>Start Date:</strong> {startDate}
        </p>
        <p>
          <strong>Due Date:</strong> {dueDate}
        </p>
        <p>
          <strong>Revenue:</strong> {revenue}
        </p>
        <hr />
        <h4>Job Site Address</h4>
        <p>
          {street}
          <br />
          {city}, {state} {zip}
        </p>
        <hr />
        <Link to="/jobs">← Back to Job List</Link>
      </div>
    </div>
  );
}

export default JobDetailPage;
