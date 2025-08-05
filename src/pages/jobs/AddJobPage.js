// File: src/pages/jobs/AddJobPage.js

import React from "react";
import { Link } from "react-router-dom";
// We can borrow the form CSS from the AddCustomerPage to keep our forms consistent
import "../customers/AddCustomerPage.css";

function AddJobPage() {
  // We will build out the real form logic here later.

  return (
    // Use the global 'page-content' class and the specific 'jobs-background' theme
    <div className="page-content jobs-background">
      {/* We can use the 'form-container' class to give this a similar card-like look */}
      <div className="form-container">
        <h2>Add a New Job</h2>
        <p>The form to create a new job will go here.</p>
        <hr />
        <Link to="/jobs">← Cancel and return to job list</Link>
      </div>
    </div>
  );
}

export default AddJobPage;
