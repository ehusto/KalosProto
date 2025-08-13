// File: src/feature/bom/BillOfMaterialsDisplay.js

import React from "react";
import "./BillOfMaterialsDisplay.css";

function BillOfMaterialsDisplay({ bom }) {
  if (!bom || bom.length === 0) {
    // It's better to return a message than null, in case it's rendered unexpectedly.
    return <p>No bill of materials has been generated yet.</p>;
  }

  return (
    <div className="bom-container">
      <table className="bom-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {bom.map((item, index) => (
            <tr key={index}>
              <td>{item.item}</td>
              <td>{item.quantity}</td>
              <td>{item.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- THIS IS THE CRUCIAL LINE THAT WAS MISSING ---
export default BillOfMaterialsDisplay;
