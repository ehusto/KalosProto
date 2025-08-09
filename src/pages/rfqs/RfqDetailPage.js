// File: src/pages/rfqs/RfqDetailPage.js

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useRfqs } from "../../context/RfqContext";
import { useCustomers } from "../../context/CustomerContext";

function RfqDetailPage() {
  const { rfqs, updateRfq } = useRfqs();
  const { customers } = useCustomers();
  const { id } = useParams();
  const navigate = useNavigate();

  // Local state to hold the specific RFQ we are viewing
  const [rfq, setRfq] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // This effect finds the RFQ from context or fetches it directly if it's not there (e.g., archived)
  useEffect(() => {
    // First, try to find the RFQ in our global context of active RFQs
    const rfqFromContext = rfqs.find((r) => r._id === id);

    if (rfqFromContext) {
      // If we find it, use it and we're done loading.
      setRfq(rfqFromContext);
      setIsLoading(false);
    } else {
      // If we DON'T find it, it must be archived, so fetch it directly from the API.
      const fetchSingleRfq = async () => {
        try {
          const response = await fetch(`http://localhost:5001/api/rfqs/${id}`);
          if (!response.ok) throw new Error("RFQ not found on server");
          const data = await response.json();
          setRfq(data); // Set our local state with the fetched data
        } catch (error) {
          console.error("Failed to fetch single RFQ:", error);
        } finally {
          setIsLoading(false); // Stop loading even if there was an error
        }
      };
      fetchSingleRfq();
    }
  }, [id, rfqs]); // Re-run if the ID in the URL changes or the global list updates

  // Display a loading message while we're finding/fetching the data
  if (isLoading) {
    return (
      <div className="page-content default-background">
        <h2>Loading RFQ...</h2>
      </div>
    );
  }

  // Display a "not found" message if, after everything, we still don't have an RFQ
  if (!rfq) {
    return (
      <div className="page-content default-background">
        <h2>RFQ not found!</h2>
        <Link to="/rfqs">← Back to RFQ List</Link>
      </div>
    );
  }

  // Find the associated customer from the global customer context
  const customer = customers.find((c) => c._id === rfq.customer_id);

  // --- HANDLER FUNCTIONS ---
  const handleStatusChange = (newStatus) => {
    if (
      window.confirm(`Are you sure you want to mark this RFQ as ${newStatus}?`)
    ) {
      updateRfq(rfq._id, { status: newStatus });
      // We also need to update our local state for an instant UI change
      setRfq((prevRfq) => ({ ...prevRfq, status: newStatus }));
    }
  };

  const handleArchive = () => {
    if (
      window.confirm(
        "Are you sure you want to archive this RFQ? It will be removed from the active list."
      )
    ) {
      updateRfq(rfq._id, { isArchived: true });
      navigate("/rfqs");
    }
  };

  const handleCreateJob = () => {
    navigate(`/jobs/new?rfqId=${rfq._id}`);
  };

  // --- STYLES AND FORMATTING ---
  const detailCardStyles = {
    textAlign: "left",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const followUpDate = rfq.follow_up_date
    ? new Date(rfq.follow_up_date).toLocaleDateString()
    : "Not scheduled";

  return (
    <div className="page-content default-background">
      <div style={detailCardStyles}>
        <h1>RFQ Details: {rfq.rfq_id}</h1>
        <p>
          <strong>Status:</strong> {rfq.status}
        </p>
        <hr />
        <h4>Customer Information</h4>
        <p>
          <strong>Customer:</strong> {customer ? customer.name : "N/A"}
        </p>
        <p>
          <strong>Company:</strong> {customer ? customer.company : "N/A"}
        </p>
        <hr />
        <h4>RFQ Information</h4>
        <p>
          <strong>Salesman:</strong> {rfq.salesman}
        </p>
        <p>
          <strong>Payment Type:</strong> {rfq.payment_type}
        </p>
        <p>
          <strong>Referral:</strong> {rfq.referral_source}
        </p>
        <p>
          <strong>Date of Inquiry:</strong>{" "}
          {new Date(rfq.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Follow-Up Date:</strong> {followUpDate}
        </p>
        <div>
          <strong>Description:</strong>
          <p style={{ marginTop: "5px", whiteSpace: "pre-wrap" }}>
            {rfq.description}
          </p>
        </div>
        <hr />
        <h4>Actions</h4>
        <div>
          {rfq.status === "Draft" && !rfq.isArchived && (
            <>
              <button
                onClick={() => handleStatusChange("Won")}
                className="add-customer-btn"
              >
                Mark as Won
              </button>
              <button
                onClick={() => handleStatusChange("Lost")}
                className="add-customer-btn"
                style={{ backgroundColor: "#e74c3c", marginLeft: "10px" }}
              >
                Mark as Lost
              </button>
            </>
          )}
          {rfq.status === "Won" && !rfq.isArchived && (
            <button onClick={handleCreateJob} className="add-customer-btn">
              Create Job from RFQ
            </button>
          )}
          {rfq.status === "Job Created" && !rfq.isArchived && (
            <p style={{ color: "#27ae60", fontWeight: "bold" }}>
              ✓ Job has been created from this RFQ.
            </p>
          )}
          {(rfq.status === "Won" ||
            rfq.status === "Lost" ||
            rfq.status === "Job Created") &&
            !rfq.isArchived && (
              <button onClick={handleArchive} style={{ marginLeft: "10px" }}>
                Archive
              </button>
            )}
          {rfq.isArchived && (
            <p style={{ color: "#7f8c8d", fontWeight: "bold" }}>
              This RFQ is archived.
            </p>
          )}
        </div>
        <hr />
        <Link to={rfq.isArchived ? "/rfqs/archive" : "/rfqs"}>
          ← Back to List
        </Link>
      </div>
    </div>
  );
}

export default RfqDetailPage;
