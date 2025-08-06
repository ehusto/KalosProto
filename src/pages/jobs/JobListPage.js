// File: src/pages/jobs/JobListPage.js

import React from "react";
import { Link } from "react-router-dom";
import { useJobs } from "../../context/JobContext";
import { useCustomers } from "../../context/CustomerContext";
import JobCard from "../../components/JobCard"; // Correct path to components folder
import "../customers/CustomerListPage.css"; // Borrow styles

function JobListPage() {
  const { jobs } = useJobs();
  const { customers } = useCustomers();

  const listContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  return (
    <div className="page-content jobs-background">
      <div className="customer-list-header">
        <h2>Job Management</h2>
        <Link to="/jobs/new" className="add-customer-btn">
          + Add New Job
        </Link>
      </div>
      <div style={listContainerStyle}>
        {jobs.length === 0 ? (
          <p>No jobs found. Add one to get started!</p>
        ) : (
          jobs.map((job) => {
            const customer = customers.find((c) => c._id === job.customer_id);
            return <JobCard key={job._id} job={job} customer={customer} />;
          })
        )}
      </div>
    </div>
  );
}

export default JobListPage;
