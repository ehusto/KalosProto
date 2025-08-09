// File: src/pages/customers/AddCustomerPage.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCustomers } from "../../context/CustomerContext";
import InputMask from "react-input-mask"; // <-- IMPORT THE NEW COMPONENT
import "./AddCustomerPage.css";

function AddCustomerPage() {
  const { addCustomer } = useCustomers();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // This state will now hold the formatted string
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newCustomerData = {
      name,
      company,
      email,
      phone, // Send the formatted phone number to the backend
      address: { street, city, state, zip },
    };

    try {
      const response = await fetch("http://localhost:5001/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomerData),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const createdCustomer = await response.json();
      addCustomer(createdCustomer);
      navigate("/customers");
    } catch (error) {
      console.error("Failed to create customer:", error);
    }
  };

  return (
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

        {/* --- THIS IS THE REPLACEMENT --- */}
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <InputMask
            mask="(999) 999-9999" // This defines the input format
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-control" // Use a generic class for styling
          >
            {(inputProps) => <input {...inputProps} type="tel" id="phone" />}
          </InputMask>
        </div>

        <hr />
        <h4>Customer Address</h4>
        {/* ... (Address inputs are the same) ... */}

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
