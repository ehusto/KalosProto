// File: src/pages/measurements/MeasurementListPage.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMeasurements } from "../../context/MeasurementContext";
import { useRfqs } from "../../context/RfqContext";
import { useCustomers } from "../../context/CustomerContext";
import MeasurementDetailModal from "../../components/MeasurementDetailModal/MeasurementDetailModal";
import "../../pages/customers/CustomerListPage.css";

function MeasurementListPage() {
  const { measurements } = useMeasurements();
  const { rfqs } = useRfqs();
  const { customers } = useCustomers();
  const [selectedMeasurement, setSelectedMeasurement] = useState(null);

  const handleViewDetailsClick = (measurement) => {
    setSelectedMeasurement(measurement);
  };

  const handleCloseModal = () => {
    setSelectedMeasurement(null);
  };

  const selectedRfq = rfqs.find(
    (r) => r._id === selectedMeasurement?.associated_rfq_id
  );
  const selectedCustomer = selectedRfq
    ? customers.find((c) => c._id === selectedRfq.customer_id)
    : null;

  const listContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "center",
  };

  const measurementRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    width: "90%",
    maxWidth: "800px",
  };

  return (
    <div className="page-content default-background">
      <div className="customer-list-header">
        <h2>Measurement List</h2>
      </div>

      <div style={listContainerStyle}>
        {measurements.length === 0 ? (
          <p>No measurements have been created yet.</p>
        ) : (
          measurements.map((measurement) => {
            const rfq = rfqs.find(
              (r) => r._id === measurement.associated_rfq_id
            );
            const customer = rfq
              ? customers.find((c) => c._id === rfq.customer_id)
              : null;

            return (
              <div key={measurement._id} style={measurementRowStyle}>
                <div>
                  <strong>{measurement.measurement_id}</strong>
                  <div style={{ fontSize: "0.8rem", color: "#555" }}>
                    For RFQ: {rfq ? rfq.rfq_id : "N/A"} | Customer:{" "}
                    {customer ? customer.name : "N/A"}
                  </div>
                </div>
                <div>
                  <strong>Area:</strong> {measurement.roof_area_sqft} sq ft
                </div>
                <button onClick={() => handleViewDetailsClick(measurement)}>
                  View Details
                </button>
              </div>
            );
          })
        )}
      </div>

      {selectedMeasurement && (
        <MeasurementDetailModal
          measurement={selectedMeasurement}
          rfq={selectedRfq}
          customer={selectedCustomer}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default MeasurementListPage;
