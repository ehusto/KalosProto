// File: src/pages/rfqs/RfqListPage.js

import React from "react";
import { Link } from "react-router-dom";
import { useRfqs } from "./RfqContext";
import RfqCard from "./RfqCard";
import "../customers/CustomerListPage.css"; // Reuse header/button styles

function RfqListPage() {
  const { rfqs } = useRfqs();

  // Define a style for our new archive button to distinguish it
  const archiveBtnStyle = {
    backgroundColor: "#7f8c8d", // A neutral grey color
    color: "white",
    padding: "10px 20px",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    transition: "background-color 0.2s",
  };

  const listContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  return (
    <div className="page-content default-background">
      <div className="customer-list-header">
        <h2>Active RFQs</h2>
        <div>
          <Link
            to="/rfqs/archive"
            style={archiveBtnStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#95a5a6")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#7f8c8d")}
          >
            View Archive
          </Link>
          <Link
            to="/rfqs/new"
            className="add-customer-btn"
            style={{ marginLeft: "1rem" }}
          >
            + Create New RFQ
          </Link>
        </div>
      </div>

      <div style={listContainerStyle}>
        {rfqs.length === 0 ? (
          <p>No active RFQs found. Create one to get started!</p>
        ) : (
          rfqs.map((rfq) => <RfqCard key={rfq._id} rfq={rfq} />)
        )}
      </div>
    </div>
  );
}

export default RfqListPage;
