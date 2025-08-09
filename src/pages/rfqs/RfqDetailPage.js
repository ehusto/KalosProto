// File: src/pages/rfqs/RfqDetailPage.js

import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useRfqs } from "../../context/RfqContext";
import { useCustomers } from "../../context/CustomerContext";
import { useMeasurements } from "../../context/MeasurementContext";
// --- CORRECTED IMPORT PATHS ---
import MeasurementForm from "../../components/MeasurementForm/MeasurementForm";
import MeasurementDisplay from "../../components/MeasurementForm/MeasurementDisplay";

function RfqDetailPage() {
  const { rfqs, updateRfq } = useRfqs();
  const { customers } = useCustomers();
  const { measurements } = useMeasurements();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAddingMeasurement, setIsAddingMeasurement] = useState(false);

  // Loading and Not Found checks...
  if (!rfqs.length || !customers.length) return <p>Loading...</p>;
  const rfq = rfqs.find((r) => r._id === id);
  if (!rfq) return <p>RFQ Not Found</p>;

  const customer = customers.find((c) => c._id === rfq.customer_id);
  const rfqMeasurement = measurements.find(
    (m) => m.associated_rfq_id === rfq._id
  );

  // Handlers...
  const handleMeasurementSave = () => setIsAddingMeasurement(false);
  const handleStatusChange = (newStatus) => {
    /* ... */
  };
  const handleArchive = () => {
    /* ... */
  };
  const handleCreateJob = () => {
    /* ... */
  };

  // Styles and Formatting...
  const detailCardStyles = {
    /* ... */
  };
  const followUpDate = rfq.follow_up_date
    ? new Date(rfq.follow_up_date).toLocaleDateString()
    : "N/A";

  return (
    <div className="page-content default-background">
      <div style={detailCardStyles}>
        {/* All JSX content is the same */}
        <hr />
        <h4>Measurements</h4>
        {rfqMeasurement ? (
          <MeasurementDisplay measurement={rfqMeasurement} />
        ) : isAddingMeasurement ? (
          <MeasurementForm rfqId={rfq._id} onSave={handleMeasurementSave} />
        ) : (
          <button
            onClick={() => setIsAddingMeasurement(true)}
            className="add-customer-btn"
          >
            + Add Measurements
          </button>
        )}
        <hr />
        <h4>Actions</h4>
        <div>{/* All action buttons JSX is the same */}</div>
        <hr />
        <Link to={rfq.isArchived ? "/rfqs/archive" : "/rfqs"}>
          ← Back to List
        </Link>
      </div>
    </div>
  );
}

export default RfqDetailPage;
