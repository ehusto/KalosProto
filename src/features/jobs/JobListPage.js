// File: src/pages/jobs/JobListPage.js

import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useJobs } from "./JobContext";
import { useCustomers } from "../customers/CustomerContext";
import { useFilters } from "../../store/FilterContext"; // Import the new filter hook
import JobCard from "./JobCard";
import "./JobListPage.css"; // We'll keep this for the header style

function JobListPage() {
  const { jobs } = useJobs();
  const { customers } = useCustomers();
  const { jobFilters } = useFilters(); // Get the current filter values from the global context

  // This useMemo hook performs the filtering. It will only re-run if the
  // main jobs list changes or if one of the filter values changes.
  const filteredJobs = useMemo(() => {
    // Start with the full list of jobs from the context
    return jobs.filter((job) => {
      // Check against the salesman filter
      if (
        jobFilters.salesman !== "All" &&
        job.salesman !== jobFilters.salesman
      ) {
        return false; // Exclude if it doesn't match
      }
      // Check against the status filter
      if (
        jobFilters.status !== "All" &&
        (job.status || "Scheduled") !== jobFilters.status
      ) {
        return false; // Exclude if it doesn't match
      }
      // Check against the city filter
      if (
        jobFilters.city !== "All" &&
        job.job_site_address?.city !== jobFilters.city
      ) {
        return false; // Exclude if it doesn't match
      }
      // If a job passes all the checks, it's included in the final array
      return true;
    });
  }, [jobs, jobFilters]); // The dependency array

  const listContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  return (
    <div className="page-content jobs-background">
      {/* The header is now simpler */}
      <div className="list-page-header">
        <h2>Job Management ({filteredJobs.length})</h2>{" "}
        {/* Show a count of matching jobs */}
        <Link to="/jobs/new" className="add-customer-btn">
          + Add New Job
        </Link>
      </div>

      {/* THE FILTER BAR UI HAS BEEN REMOVED FROM THIS FILE */}

      <div style={listContainerStyle}>
        {filteredJobs.length === 0 ? (
          <p>No jobs match the current filters.</p>
        ) : (
          // We now map over the 'filteredJobs' array instead of the original 'jobs' array
          filteredJobs.map((job) => {
            const customer = customers.find((c) => c._id === job.customer_id);
            return <JobCard key={job._id} job={job} customer={customer} />;
          })
        )}
      </div>
    </div>
  );
}

export default JobListPage;
