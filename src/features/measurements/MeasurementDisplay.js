// File: src/components/MeasurementForm/MeasurementDisplay.js

import React from "react";
import "./MeasurementDisplay.css"; // We will create this CSS file next

function MeasurementDisplay({ measurement }) {
  // Defensive check: If no measurement data is passed, render nothing.
  if (!measurement) {
    return null;
  }

  return (
    <div className="measurement-display-container">
      <div className="measurement-grid">
        <div className="measurement-item">
          <span className="measurement-label">Total Area</span>
          <span className="measurement-value">
            {measurement.roof_area_sqft} sq ft
          </span>
        </div>
        <div className="measurement-item">
          <span className="measurement-label">Roof Pitch</span>
          <span className="measurement-value">{measurement.pitch}</span>
        </div>
        <div className="measurement-item">
          <span className="measurement-label">Eaves</span>
          <span className="measurement-value">{measurement.eaves_ft} ft</span>
        </div>
        <div className="measurement-item">
          <span className="measurement-label">Ridges</span>
          <span className="measurement-value">{measurement.ridges_ft} ft</span>
        </div>
        <div className="measurement-item">
          <span className="measurement-label">Valleys</span>
          <span className="measurement-value">{measurement.valleys_ft} ft</span>
        </div>
        <div className="measurement-item">
          <span className="measurement-label">Hips</span>
          <span className="measurement-value">{measurement.hips_ft} ft</span>
        </div>
      </div>
      {measurement.notes && (
        <div className="measurement-notes">
          <strong>Notes:</strong>
          <p>{measurement.notes}</p>
        </div>
      )}
    </div>
  );
}

export default MeasurementDisplay;
