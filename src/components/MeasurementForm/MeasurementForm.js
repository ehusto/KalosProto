// File: src/components/MeasurementForm/MeasurementForm.js

import React, { useState } from "react";
import { useMeasurements } from "../../context/MeasurementContext";
import "../../pages/customers/AddCustomerPage.css"; // Reuse form styles

// This component will receive the RFQ's ID and a function to call when it's done.
function MeasurementForm({ rfqId, onSave }) {
  const { addMeasurement } = useMeasurements();

  // State for all the measurement fields
  const [roofAreaSqft, setRoofAreaSqft] = useState("");
  const [pitch, setPitch] = useState("");
  const [eavesFt, setEavesFt] = useState("");
  const [ridgesFt, setRidgesFt] = useState("");
  const [valleysFt, setValleysFt] = useState("");
  const [hipsFt, setHipsFt] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newMeasurementData = {
      associated_rfq_id: rfqId, // Link this measurement to the RFQ
      roof_area_sqft: parseFloat(roofAreaSqft) || 0,
      pitch,
      eaves_ft: parseFloat(eavesFt) || 0,
      ridges_ft: parseFloat(ridgesFt) || 0,
      valleys_ft: parseFloat(valleysFt) || 0,
      hips_ft: parseFloat(hipsFt) || 0,
      notes,
    };

    try {
      const response = await fetch("http://localhost:5001/api/measurements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMeasurementData),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const createdMeasurement = await response.json();

      addMeasurement(createdMeasurement); // Update global state
      onSave(createdMeasurement); // Tell the parent page we are done
    } catch (error) {
      console.error("Failed to create measurement:", error);
    }
  };

  return (
    <div
      className="form-container"
      style={{ marginTop: "1rem", borderTop: "2px solid #eee" }}
    >
      <h4 style={{ textAlign: "left" }}>Enter Roof Measurements</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="roofArea">Total Roof Area (sq ft)</label>
          <input
            type="number"
            id="roofArea"
            value={roofAreaSqft}
            onChange={(e) => setRoofAreaSqft(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pitch">Roof Pitch (e.g., 6/12)</label>
          <input
            type="text"
            id="pitch"
            value={pitch}
            onChange={(e) => setPitch(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="eaves">Eaves (ft)</label>
          <input
            type="number"
            id="eaves"
            value={eavesFt}
            onChange={(e) => setEavesFt(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ridges">Ridges (ft)</label>
          <input
            type="number"
            id="ridges"
            value={ridgesFt}
            onChange={(e) => setRidgesFt(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="valleys">Valleys (ft)</label>
          <input
            type="number"
            id="valleys"
            value={valleysFt}
            onChange={(e) => setValleysFt(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="hips">Hips (ft)</label>
          <input
            type="number"
            id="hips"
            value={hipsFt}
            onChange={(e) => setHipsFt(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="notes">Measurement Notes</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="3"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="add-customer-btn">
            Save Measurements
          </button>
          <button
            type="button"
            onClick={() => onSave(null)}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default MeasurementForm;
