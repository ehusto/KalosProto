// File: src/pages/rfqs/RfqDetailPage.js

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useRfqs } from "./RfqContext";
import { useCustomers } from "../../features/customers/CustomerContext";
import { useMeasurements } from "../measurements/MeasurementContext";
import { useJobs } from "../../features/jobs/JobContext";
import MeasurementForm from "../measurements/MeasurementForm";
import MeasurementDisplay from "../measurements/MeasurementDisplay";
import BillOfMaterialsDisplay from "../bom/BillOfMaterialsDisplay";

function RfqDetailPage() {
  const { rfqs, updateRfq } = useRfqs();
  const { customers } = useCustomers();
  const { measurements, calculateBOM } = useMeasurements();
  const { jobs } = useJobs(); // Get the global list of all jobs
  const { id } = useParams();
  const navigate = useNavigate();

  const [rfq, setRfq] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingMeasurement, setIsAddingMeasurement] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const rfqFromContext = rfqs.find((r) => r._id === id);

    if (rfqFromContext) {
      setRfq(rfqFromContext);
      setIsLoading(false);
    } else {
      const fetchSingleRfq = async () => {
        try {
          const response = await fetch(`http://localhost:5001/api/rfqs/${id}`);
          if (!response.ok) throw new Error("RFQ not found on server");
          const data = await response.json();
          if (isMounted) setRfq(data);
        } catch (error) {
          console.error("Failed to fetch single RFQ:", error);
          if (isMounted) setRfq(null);
        } finally {
          if (isMounted) setIsLoading(false);
        }
      };
      fetchSingleRfq();
    }

    return () => {
      isMounted = false;
    };
  }, [id, rfqs]);

  if (isLoading) {
    return (
      <div className="page-content default-background">
        <h2>Loading RFQ Details...</h2>
      </div>
    );
  }

  if (!rfq) {
    return (
      <div className="page-content default-background">
        <h2>RFQ not found!</h2>
        <Link to="/rfqs">← Back to RFQ List</Link>
      </div>
    );
  }

  const customer = customers.find((c) => c._id === rfq.customer_id);
  const rfqMeasurement = measurements.find(
    (m) => m.associated_rfq_id === rfq._id
  );

  // This logic now works because the JobContext has the newly created job
  const associatedJob = rfq.associated_job_db_id
    ? jobs.find((job) => job._id === rfq.associated_job_db_id)
    : null;

  const handleMeasurementSave = () => setIsAddingMeasurement(false);

  const handleStatusChange = (newStatus) => {
    if (
      window.confirm(`Are you sure you want to mark this RFQ as ${newStatus}?`)
    ) {
      updateRfq(rfq._id, { status: newStatus });
      setRfq((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleArchive = () => {
    if (window.confirm("Are you sure you want to archive this RFQ?")) {
      updateRfq(rfq._id, { isArchived: true });
      navigate("/rfqs");
    }
  };

  const handleCreateJob = () => navigate(`/jobs/new?rfqId=${rfq._id}`);

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
        <h4>Measurements</h4>
        {rfqMeasurement ? (
          <>
            <MeasurementDisplay measurement={rfqMeasurement} />
            <div style={{ marginTop: "1rem" }}>
              <h5 style={{ marginBottom: "0.5rem" }}>Bill of Materials</h5>
              {rfqMeasurement.billOfMaterials ? (
                <BillOfMaterialsDisplay bom={rfqMeasurement.billOfMaterials} />
              ) : (
                <button
                  onClick={() => calculateBOM(rfqMeasurement._id)}
                  className="add-customer-btn"
                >
                  Generate Bill of Materials
                </button>
              )}
            </div>
          </>
        ) : isAddingMeasurement ? (
          <MeasurementForm rfqId={rfq._id} onSave={handleMeasurementSave} />
        ) : (
          <button
            onClick={() => setIsAddingMeasurement(true)}
            className="add-customer-btn"
          >
            + Add Manual Measurements
          </button>
        )}
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
          {rfq.status === "Job Created" && !rfq.isArchived ? (
            associatedJob ? (
              <p style={{ color: "#27ae60", fontWeight: "bold" }}>
                ✓ Job Created:
                <Link to={`/jobs/${associatedJob._id}`}>
                  {" "}
                  {associatedJob.job_id}
                </Link>
              </p>
            ) : (
              <p style={{ color: "#27ae60", fontWeight: "bold" }}>
                ✓ Job Created: {rfq.associated_job_id} (Loading link...)
              </p>
            )
          ) : null}
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
