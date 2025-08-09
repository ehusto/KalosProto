// File: src/pages/customers/AddCustomerPage.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCustomers } from "../../context/CustomerContext";
import { IMaskInput } from "react-imask"; // <-- IMPORT THE NEW COMPONENT
import "./AddCustomerPage.css";

function AddCustomerPage() {
  const { addCustomer } = useCustomers();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // This will hold the unmasked value
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
      phone, // Send the clean, unmasked phone number
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

        {/* --- THIS IS THE NEW, WORKING MASKED INPUT --- */}
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <IMaskInput
            mask="(000) 000-0000" // Use 0 as a digit placeholder
            unmask={true} // This is key: the value returned to onAccept will be the raw numbers
            id="phone"
            className="form-control" // Use our existing style
            placeholder="(123) 456-7890"
            onAccept={(value) => setPhone(value)} // Use onAccept for unmasked value
          />
        </div>

        <hr />
        <h4>Customer Address</h4>

        <div className="form-group">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="zip">Zip Code</label>
          <input
            type="text"
            id="zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
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
