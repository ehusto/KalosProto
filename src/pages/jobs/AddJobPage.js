// File: src/pages/jobs/AddJobPage.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCustomers } from "../../context/CustomerContext"; // <-- IMPORT our hook to get customers
import "../customers/AddCustomerPage.css"; // <-- REUSE the CSS from our customer form

function AddJobPage() {
  const navigate = useNavigate();

  // --- STATE MANAGEMENT ---

  // 1. Get the list of all customers from our global context.
  const { customers } = useCustomers();

  // 2. Create state variables for each field in our job form.
  const [salesman, setSalesman] = useState("");
  const [jobSizeSq, setJobSizeSq] = useState("");
  const [scheduledStartDate, setScheduledStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [revenue, setRevenue] = useState("");
  // This state will hold the ID of the customer chosen from the dropdown.
  const [selectedCustomerId, setSelectedCustomerId] = useState("");

  // --- FORM SUBMISSION ---
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create the new job object from our state. This is the data we'll send.
    const newJobData = {
      salesman,
      job_size_sq: parseFloat(jobSizeSq), // Convert string to number
      scheduled_start_date: scheduledStartDate,
      due_date: dueDate,
      revenue: parseFloat(revenue), // Convert string to number
      customer_id: selectedCustomerId, // The crucial link to the customer
    };

    try {
      // Send the data to our backend's /api/jobs endpoint
      const response = await fetch("http://localhost:5001/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJobData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // We don't need to do anything with the response for now.
      // Just navigate back to the job list page on success.
      navigate("/jobs");
    } catch (error) {
      console.error("Failed to create job:", error);
    }
  };

  return (
    <div className="page-content jobs-background">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Add a New Job</h2>

        {/* --- CUSTOMER DROPDOWN --- */}
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
            {/* We map over the customers from our context to create the options */}
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

        <div className="form-group">
          <label htmlFor="jobSize">Job Size (in squares)</label>
          <input
            type="number"
            id="jobSize"
            value={jobSizeSq}
            onChange={(e) => setJobSizeSq(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="startDate">Scheduled Start Date</label>
          <input
            type="date"
            id="startDate"
            value={scheduledStartDate}
            onChange={(e) => setScheduledStartDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="revenue">Revenue</label>
          <input
            type="number"
            step="0.01"
            id="revenue"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="add-customer-btn">
            Save Job
          </button>
          <Link to="/jobs" style={{ marginLeft: "10px" }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddJobPage;
