// File: src/components/CustomerListPage.js

import React from "react";
import { Link } from "react-router-dom"; // <-- IMPORT Link
import CustomerCard from "./CustomerCard";
import "./CustomerListPage.css"; // <-- IMPORT the new CSS

function CustomerListPage() {
  const customers = [
    {
      id: 1,
      name: "John Doe",
      company: "Doe Enterprises",
      email: "john.doe@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      company: "Smith Solutions",
      email: "jane.smith@example.com",
    },
    {
      id: 3,
      name: "Peter Jones",
      company: "Jones & Co.",
      email: "peter.jones@example.com",
    },
  ];

  const listContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  const pageStyles = {
    padding: "20px",
  };

  return (
    <div className="customers-background" style={pageStyles}>
      {/* --- NEW HEADER SECTION --- */}
      <div className="customer-list-header">
        <h2>Customer Management</h2>
        {/* This Link component looks like a button thanks to our CSS */}
        <Link to="/customers/new" className="add-customer-btn">
          + Add New Customer
        </Link>
      </div>
      {/* --- END OF NEW SECTION --- */}

      <div style={listContainerStyle}>
        {customers.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </div>
    </div>
  );
}

export default CustomerListPage;
