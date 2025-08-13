// File: src/pages/jobs/AddJobPage.js

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCustomers } from "../customers/CustomerContext";
import { useJobs } from "./JobContext";
import { useRfqs } from "../../context/RfqContext"; // We need the RFQ update function
import "../../features/customers/AddCustomerPage.css";

// Custom hook to read URL query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function AddJobPage() {
  const navigate = useNavigate();
  const query = useQuery();
  const { customers } = useCustomers();
  const { addJob } = useJobs(); // Get the addJob function
  const { rfqs, updateRfq } = useRfqs(); // Get the updateRfq function

  // --- State for all form fields ---
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
  const [originatingRfqId, setOriginatingRfqId] = useState(null);
  const [isGeneratingFromRfq, setIsGeneratingFromRfq] = useState(false);
  const [rfqData, setRfqData] = useState(null);

  useEffect(() => {
    const rfqId = query.get("rfqId");
    if (rfqId && rfqs.length > 0 && !rfqData) {
      setIsGeneratingFromRfq(true);
      const foundRfq = rfqs.find((r) => r._id === rfqId);
      if (foundRfq) {
        setRfqData(foundRfq);
        setSalesman(foundRfq.salesman || "");
        setSelectedCustomerId(foundRfq.customer_id || "");
        setStreet(foundRfq.job_site_address?.street || "");
        setCity(foundRfq.job_site_address?.city || "");
        setState(foundRfq.job_site_address?.state || "");
        setZip(foundRfq.job_site_address?.zip || "");
        setOriginatingRfqId(foundRfq.rfq_id);
      }
    }
  }, [query, rfqs, rfqData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const rfqIdFromUrl = query.get("rfqId"); // This is the MongoDB _id
    const newJobData = {
      salesman,
      job_size_sq: parseFloat(jobSizeSq) || 0,
      revenue: parseFloat(revenue) || 0,
      scheduled_start_date: scheduledStartDate,
      due_date: dueDate,
      customer_id: selectedCustomerId,
      job_site_address: { street, city, state, zip },
      originating_rfq_id: originatingRfqId,
    };

    try {
      const response = await fetch("http://localhost:5001/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJobData),
      });
      if (!response.ok) throw new Error("Network response was not ok");

      const createdJob = await response.json();

      // Update the JobContext with the new job
      addJob(createdJob);

      // If this came from an RFQ, update the RFQ's status in the RFQContext
      if (rfqIdFromUrl) {
        updateRfq(rfqIdFromUrl, { status: "Job Created" });
      }

      // Navigate to the new job's detail page
      navigate(`/jobs/${createdJob._id}`);
    } catch (error) {
      console.error("Failed to create job:", error);
    }
  };

  const selectedCustomer = customers.find((c) => c._id === selectedCustomerId);

  return (
    <div className="page-content jobs-background">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>{isGeneratingFromRfq ? "Generate New Job" : "Add a New Job"}</h2>
        {originatingRfqId && (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#27ae60",
            }}
          >
            <em>From RFQ: {originatingRfqId}</em>
          </p>
        )}

        {isGeneratingFromRfq ? (
          <>
            <p>
              <strong>Customer:</strong>{" "}
              {selectedCustomer ? selectedCustomer.name : "..."}
            </p>
            <p>
              <strong>Address:</strong> {street}, {city}
            </p>
            <hr />
            <h4>Scheduling</h4>
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
              />
            </div>
          </>
        ) : (
          <>{/* Full manual add job form JSX goes here */}</>
        )}

        <div className="form-actions">
          <button type="submit" className="add-customer-btn">
            {isGeneratingFromRfq ? "Generate Job" : "Save Job"}
          </button>
          <Link
            to={isGeneratingFromRfq ? `/rfqs/${query.get("rfqId")}` : "/jobs"}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddJobPage;
