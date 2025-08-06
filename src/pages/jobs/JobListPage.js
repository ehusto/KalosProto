// File: src/pages/jobs/JobListPage.js

import React, { useState, useEffect } from "react"; // <-- IMPORT hooks
import { Link } from "react-router-dom";
import JobCard from "../../components/JobCard"; // <-- IMPORT the new JobCard
import "../customers/CustomerListPage.css";

function JobListPage() {
  // --- STATE AND DATA FETCHING ---
  // 1. Create a state variable to hold the list of jobs.
  const [jobs, setJobs] = useState([]);

  // 2. Use useEffect to fetch the jobs from the API when the page loads.
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/jobs");
        const data = await response.json();
        setJobs(data); // Update our state with the jobs from the database
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchJobs();
  }, []); // The empty array means this effect runs only once.

  // --- STYLES ---
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

      {/* --- DISPLAY LOGIC --- */}
      <div style={listContainerStyle}>
        {/* If there are no jobs, show a message. Otherwise, map and display them. */}
        {jobs.length === 0 ? (
          <p>No jobs found. Add one to get started!</p>
        ) : (
          jobs.map((job) => <JobCard key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
}

export default JobListPage;
