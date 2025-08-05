// File: src/pages/jobs/JobListPage.js

import React from "react";
import { Link } from "react-router-dom";
// We can borrow the CSS from the customer list page to keep our headers consistent!
import "../customers/CustomerListPage.css";

function JobListPage() {
  // We'll add state and data fetching here later.

  return (
    // Use the global 'page-content' class and the specific 'jobs-background' theme
    <div className="page-content jobs-background">
      <div className="customer-list-header">
        <h2>Job Management</h2>
        {/* The button uses 'add-customer-btn', which is also in CustomerListPage.css */}
        <Link to="/jobs/new" className="add-customer-btn">
          + Add New Job
        </Link>
      </div>
      <p>A list of all jobs will be displayed here.</p>
    </div>
  );
}

export default JobListPage;
