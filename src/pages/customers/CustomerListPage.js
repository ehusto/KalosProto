// File: src/pages/customers/CustomerListPage.js

import React from "react";
import { Link } from "react-router-dom";
import { useCustomers } from "../../context/CustomerContext";
import CustomerCard from "../../components/CustomerCard";
import "./CustomerListPage.css";

function CustomerListPage() {
  const { customers } = useCustomers();

  console.log(
    "CUSTOMER LIST PAGE: Received customers from context:",
    customers
  );

  const listContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  return (
    <div className="page-content customers-background">
      <div className="customer-list-header">
        <h2>Customer Management</h2>
        <Link to="/customers/new" className="add-customer-btn">
          + Add New Customer
        </Link>
      </div>

      <div style={listContainerStyle}>
        {customers.map((customer) => (
          <CustomerCard key={customer._id} customer={customer} />
        ))}
      </div>
    </div>
  );
}

export default CustomerListPage;
