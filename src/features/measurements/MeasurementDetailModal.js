// File: src/components/MeasurementDetailModal/MeasurementDetailModal.js
import React from "react";
import { Link } from "react-router-dom";
import MeasurementDisplay from "../../features/measurements/MeasurementDisplay"; // Reuse our display
import BillOfMaterialsDisplay from "../BillOfMaterialsDisplay/BillOfMaterialsDisplay";
import "./MeasurementDetailModal.css";

function MeasurementDetailModal({ measurement, rfq, customer, onClose }) {
  if (!measurement) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>

        <h3>Project Estimate Overview {measurement.measurement_id}</h3>
        <hr />

        <h4>Associations</h4>
        <p>
          <strong>RFQ:</strong> {rfq ? rfq.rfq_id : "N/A"}
        </p>
        <p>
          <strong>Customer:</strong> {customer ? customer.name : "N/A"}
        </p>
        <hr />

        <h4>Roof Measurements </h4>
        <MeasurementDisplay measurement={measurement} />

        {/* --- BOM Display --- */}
        {measurement.billOfMaterials && (
          <>
            <hr />
            <h4>Bill of Materials</h4>
            <BillOfMaterialsDisplay bom={measurement.billOfMaterials} />
          </>
        )}

        <hr />
        {/* Link to the full RFQ page for more actions */}

        <Link
          to={`/rfqs/${measurement.associated_rfq_id}`}
          className="add-customer-btn"
        >
          View RFQ
        </Link>
      </div>
    </div>
  );
}
export default MeasurementDetailModal;
