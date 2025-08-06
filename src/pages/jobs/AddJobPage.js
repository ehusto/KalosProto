// File: src/pages/jobs/AddJobPage.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCustomers } from "../../context/CustomerContext";
import { useJobs } from "../../context/JobContext";
import "../customers/AddCustomerPage.css";

function AddJobPage() {
  const navigate = useNavigate();
  const { customers } = useCustomers();
  const { addJob } = useJobs();

  // State for all form fields
  const [salesman, setSalesman] = useState("");
  const [jobSizeSq, setJobSizeSq] = useState("");
  const [scheduledStartDate, setScheduledStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [revenue, setRevenue] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newJobData = {
      salesman,
      job_size_sq: parseFloat(jobSizeSq),
      scheduled_start_date: scheduledStartDate,
      due_date: dueDate,
      revenue: parseFloat(revenue),
      customer_id: selectedCustomerId,
      job_site_address: { street, city, state, zip },
    };

    try {
      const response = await fetch("http://localhost:5001/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJobData),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const createdJob = await response.json();
      addJob(createdJob);
      navigate("/jobs");
    } catch (error) {
      console.error("Failed to create job:", error);
    }
  };

  return (
    <div className="page-content jobs-background">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Add a New Job</h2>

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
          {/* --- THIS IS THE CORRECTED LINE --- */}
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
