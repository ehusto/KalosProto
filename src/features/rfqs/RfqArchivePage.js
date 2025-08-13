// File: src/pages/rfqs/RfqArchivePage.js

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // <-- IMPORT useLocation
import RfqCard from "./RfqCard";
import "../../pages/customers/CustomerListPage.css";

function RfqArchivePage() {
  const [archivedRfqs, setArchivedRfqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation(); // <-- GET THE LOCATION OBJECT

  // This useEffect will now re-run every time the location (URL) changes,
  // which effectively means every time you navigate TO this page.
  useEffect(() => {
    const fetchArchivedRfqs = async () => {
      setIsLoading(true); // Set loading state to true on each fetch
      try {
        const response = await fetch(
          "http://localhost:5001/api/rfqs?status=archived"
        );
        const data = await response.json();
        setArchivedRfqs(data);
      } catch (error) {
        console.error("Failed to fetch archived RFQs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArchivedRfqs();
  }, [location]); // <-- ADD 'location' TO THE DEPENDENCY ARRAY

  const listContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  const backLinkStyle = {
    backgroundColor: "#3498db",
    color: "white",
    padding: "10px 20px",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
  };

  if (isLoading) {
    return (
      <div className="page-content default-background">
        <p>Loading archived RFQs...</p>
      </div>
    );
  }

  return (
    <div className="page-content default-background">
      <div className="customer-list-header">
        <h2>Archived RFQs</h2>
        <Link to="/rfqs" style={backLinkStyle}>
          ← Back to Active RFQs
        </Link>
      </div>
      <div style={listContainerStyle}>
        {archivedRfqs.length === 0 ? (
          <p>No archived RFQs found.</p>
        ) : (
          archivedRfqs.map((rfq) => <RfqCard key={rfq._id} rfq={rfq} />)
        )}
      </div>
    </div>
  );
}

export default RfqArchivePage;
