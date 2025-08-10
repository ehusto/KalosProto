// File: src/components/EventDetailModal/EventDetailModal.js
import React from "react";
import { Link } from "react-router-dom";
import "./EventDetailModal.css";

function EventDetailModal({ job, customer, onClose }) {
  if (!job) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        <h3>Job Details: {job.job_id}</h3>
        <p>
          <strong>Status:</strong> {job.status || "Scheduled"}
        </p>
        <hr />
        <h4>Customer Information</h4>
        <p>
          <strong>Customer:</strong> {customer ? customer.name : "N/A"}
        </p>
        <p>
          <strong>Address:</strong> {job.job_site_address?.street},{" "}
          {job.job_site_address?.city}
        </p>
        <hr />
        <Link to={`/jobs/${job._id}`} className="add-customer-btn">
          View Full Job Details
        </Link>
      </div>
    </div>
  );
}
export default EventDetailModal;
