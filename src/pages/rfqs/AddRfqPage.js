// File: src/pages/rfqs/AddRfqPage.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCustomers } from "../../features/customers/CustomerContext";
import { useRfqs } from "../../context/RfqContext";
import "../../features/customers/AddCustomerPage.css"; // Reuse form styles

function AddRfqPage() {
  const navigate = useNavigate();
  const { customers } = useCustomers();
  const { addRfq } = useRfqs();

  // --- State for ALL form fields ---
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [salesman, setSalesman] = useState("");
  const [paymentType, setPaymentType] = useState("Insurance");
  const [referralSource, setReferralSource] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("Phone Call");
  const [followUpDate, setFollowUpDate] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newRfqData = {
      customer_id: selectedCustomerId,
      salesman,
      payment_type: paymentType,
      referral_source: referralSource,
      description,
      source,
      follow_up_date: followUpDate,
      job_site_address: { street, city, state, zip },
    };

    console.log("FRONTEND: Submitting new RFQ data:", newRfqData); // DEBUG

    try {
      const response = await fetch("http://localhost:5001/api/rfqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRfqData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const createdRfq = await response.json();
      addRfq(createdRfq);
      navigate("/rfqs");
    } catch (error) {
      console.error("FRONTEND: Failed to create RFQ:", error);
    }
  };

  return (
    <div className="page-content default-background">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "left", marginBottom: "2rem" }}>
          Create New RFQ (Request for Quote)
        </h2>

        {/* --- Primary Information --- */}
        <div className="form-group">
          <label htmlFor="customer">Customer</label>
          <select
            id="customer"
            value={selectedCustomerId}
            onChange={(e) => setSelectedCustomerId(e.target.value)}
            required
          >
            <option value="" disabled>
              -- Select a Customer --
            </option>
            {customers.map((customer) => (
              <option key={customer._id} value={customer._id}>
                {customer.name} ({customer.company})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="salesman">Salesman</label>
          <input
            type="text"
            id="salesman"
            value={salesman}
            onChange={(e) => setSalesman(e.target.value)}
            required
          />
        </div>

        {/* --- RFQ Details --- */}
        <div className="form-group">
          <label htmlFor="source">Source of RFQ</label>
          <select
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
          >
            <option value="Phone Call">Phone Call</option>
            <option value="Website Form">Website Form</option>
            <option value="Email Inquiry">Email Inquiry</option>
            <option value="In-Person">In-Person</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Payment Type</label>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "5px" }}
          >
            <label
              style={{
                marginRight: "20px",
                fontWeight: "normal",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                type="radio"
                value="Insurance"
                checked={paymentType === "Insurance"}
                onChange={(e) => setPaymentType(e.target.value)}
                style={{ width: "auto", marginRight: "5px" }}
              />
              Insurance
            </label>
            <label
              style={{
                fontWeight: "normal",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                type="radio"
                value="Homeowner"
                checked={paymentType === "Homeowner"}
                onChange={(e) => setPaymentType(e.target.value)}
                style={{ width: "auto", marginRight: "5px" }}
              />
              Homeowner
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="referral">
            Referral Source (e.g., Google, Facebook, Friend's Name)
          </label>
          <input
            type="text"
            id="referral"
            value={referralSource}
            onChange={(e) => setReferralSource(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="followUpDate">Scheduled Follow-Up Date</label>
          <input
            type="date"
            id="followUpDate"
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description / Notes</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          />
        </div>

        <hr />
        <h4>Job Site Address</h4>

        <div className="form-group">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
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
            Create RFQ
          </button>
          <Link to="/rfqs" style={{ marginLeft: "10px" }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddRfqPage;
