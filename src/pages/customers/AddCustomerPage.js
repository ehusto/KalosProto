// File: src/pages/customers/AddCustomerPage.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCustomers } from "../../context/CustomerContext"; // <-- IMPORT our custom hook
import "./AddCustomerPage.css";

// This component no longer accepts any props.
function AddCustomerPage() {
  // --- THIS IS THE KEY CHANGE ---
  // We get the 'addCustomer' function directly from the context.
  const { addCustomer } = useCustomers();

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newCustomerData = {
      name,
      company,
      email,
      phone,
      address,
    };

    try {
      const response = await fetch("http://localhost:5001/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCustomerData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const createdCustomer = await response.json();

      // We call the 'addCustomer' function that we got from the context.
      addCustomer(createdCustomer);

      navigate("/customers");
    } catch (error) {
      console.error("Failed to create customer:", error);
    }
  };

  return (
    // Use the global 'page-content' and 'customers-background' classes for layout
    <div className="page-content customers-background">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Add a New Customer</h2>

        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="add-customer-btn">
            Save Customer
          </button>
          <Link to="/customers" style={{ marginLeft: "10px" }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddCustomerPage;
