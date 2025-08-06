// File: src/pages/customers/AddCustomerPage.js

import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCustomers } from "../../context/CustomerContext";
import "./AddCustomerPage.css";

function AddCustomerPage() {
  const { addCustomer } = useCustomers();
  const navigate = useNavigate();

  // State for the main fields
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // --- NEW: State for the structured address ---
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // --- KEY CHANGE: Create the correct data structure ---
    const newCustomerData = {
      name,
      company,
      email,
      phone,
      // Nest the address fields into an 'address' object
      address: { street, city, state, zip },
    };

    // This console.log is our #1 debugging tool. It shows us EXACTLY what we are sending.
    console.log("Submitting new customer data:", newCustomerData);

    try {
      const response = await fetch("http://localhost:5001/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomerData),
      });

      // If the server responds with an error, the browser will show it in the Network tab
      if (!response.ok) {
        // We can also get the error message from the server
        const errorData = await response.json();
        throw new Error(`Network response was not ok: ${errorData.message}`);
      }

      const createdCustomer = await response.json();
      addCustomer(createdCustomer);
      navigate("/customers");
    } catch (error) {
      console.error("Failed to create customer:", error);
      // We could add a user-facing error message here in a real app
    }
  };

  // --- COMPLETE FORM JSX WITH SEPARATE ADDRESS FIELDS ---
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
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
