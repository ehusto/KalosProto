// File: src/pages/customers/CustomerListPage.js

import React from "react";
import { Link } from "react-router-dom";
import { useCustomers } from "../../context/CustomerContext"; // <-- IMPORT our custom hook
import CustomerCard from "../../components/CustomerCard"; // <-- IMPORT the reusable card
import "./CustomerListPage.css"; // <-- Its own specific styles

function CustomerListPage() {
  // --- THIS IS THE KEY CHANGE ---
  // We get the 'customers' list directly from the context, no props needed!
  const { customers } = useCustomers();

  const listContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  return (
    // Use the global 'page-content' and 'customers-background' classes for layout
    <div className="page-content customers-background">
      <div className="customer-list-header">
        <h2>Customer Management</h2>
        <Link to="/customers/new" className="add-customer-btn">
          + Add New Customer
        </Link>
      </div>

      <div style={listContainerStyle}>
        {/* We map over the 'customers' variable we got from the context */}
        {customers.map((customer) => (
          <CustomerCard key={customer._id} customer={customer} />
        ))}
      </div>
    </div>
  );
}

export default CustomerListPage;
