// File: src/components/AddCustomerPage.js

import React from "react";
import { Link } from "react-router-dom";

// This is the function that defines our component
function AddCustomerPage() {
  const pageStyles = {
    padding: "20px",
  };

  return (
    <div style={pageStyles}>
      <h2>Add a New Customer</h2>
      <p>This is where the form to create a new customer will go.</p>
      <hr />
      <Link to="/customers">← Cancel and return to list</Link>
    </div>
  );
}

// CRUCIAL: This line makes the component available for other files to import.
// This is almost certainly the line that was missing.
export default AddCustomerPage;
