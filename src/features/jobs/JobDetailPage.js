// File: src/pages/jobs/JobDetailPage.js

import React from "react";
import { useParams, Link } from "react-router-dom";
import { useJobs } from "./JobContext";
import { useCustomers } from "../customers/CustomerContext";

function JobDetailPage() {
  const { jobs, updateJob } = useJobs(); // Get the new updateJob function
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

  const handleStatusUpdate = (newStatus) => {
    if (
      window.confirm(
        `Are you sure you want to change the status to "${newStatus}"?`
      )
    ) {
      updateJob(job._id, { status: newStatus });
    }
  };

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
        <p>
          <strong>Status:</strong> {job.status || "Scheduled"}
        </p>
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

        <h4>Actions</h4>
        <div>
          {job.status === "Scheduled" && (
            <button
              onClick={() => handleStatusUpdate("In Progress")}
              className="add-customer-btn"
            >
              Start Job
            </button>
          )}
          {(job.status === "In Progress" ||
            job.status === "Pending Materials") && (
            <>
              <button
                onClick={() => handleStatusUpdate("Completed")}
                className="add-customer-btn"
              >
                Complete Job
              </button>
              <button
                onClick={() => handleStatusUpdate("On Hold")}
                className="add-customer-btn"
                style={{ backgroundColor: "#f39c12", marginLeft: "10px" }}
              >
                Put on Hold
              </button>
            </>
          )}
          {job.status === "On Hold" && (
            <button
              onClick={() => handleStatusUpdate("In Progress")}
              className="add-customer-btn"
            >
              Resume Job
            </button>
          )}
          {job.status === "Completed" && (
            <button
              onClick={() => handleStatusUpdate("Invoiced")}
              className="add-customer-btn"
              style={{ backgroundColor: "#3498db" }}
            >
              Send Final Invoice
            </button>
          )}
          {job.status === "Invoiced" && (
            <button
              onClick={() => handleStatusUpdate("Paid in Full")}
              className="add-customer-btn"
              style={{ backgroundColor: "#27ae60" }}
            >
              Mark as Paid
            </button>
          )}
          {job.status === "Paid in Full" && (
            <button
              onClick={() => handleStatusUpdate("Closed")}
              className="add-customer-btn"
              style={{ backgroundColor: "#7f8c8d" }}
            >
              Close Job
            </button>
          )}
          {job.status === "Closed" && (
            <p style={{ color: "#7f8c8d", fontWeight: "bold" }}>
              ✓ This job has been closed.
            </p>
          )}
        </div>

        <hr />
        <Link to="/jobs">← Back to Job List</Link>
      </div>
    </div>
  );
}

export default JobDetailPage;
