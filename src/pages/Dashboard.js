// File: src/pages/Dashboard.js

import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faClipboardList,
  faCalendarAlt,
  faFileInvoice,
  faRulerCombined,
} from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  return (
    // Use the global 'page-content' class for layout and 'dashboard-background' for the theme
    <div className="page-content dashboard-background">
      {/* This is the container for our grid of app icons */}
      <div className="dashboard-grid">
        {/* --- App Icon 1: Customers --- */}
        <Link to="/customers" className="dashboard-app-link">
          <FontAwesomeIcon icon={faUsers} className="app-icon" />
          <span className="app-title">Customers</span>
        </Link>

        {/* --- App Icon 2: Jobs --- */}
        <Link to="/jobs" className="dashboard-app-link">
          <FontAwesomeIcon icon={faClipboardList} className="app-icon" />
          <span className="app-title">Jobs</span>
        </Link>

        {/* --- App Icon 3: Calendar --- */}
        <Link to="/calendar" className="dashboard-app-link">
          <FontAwesomeIcon icon={faCalendarAlt} className="app-icon" />
          <span className="app-title">Calendar</span>
        </Link>

        {/* --- App Icon 4: RFQs --- */}
        <Link to="/rfqs" className="dashboard-app-link">
          <FontAwesomeIcon icon={faFileInvoice} className="app-icon" />
          <span className="app-title">RFQs</span>
        </Link>

        {/* --- App Icon 5: BOM --- */}
        <Link to="/measurements" className="dashboard-app-link">
          <FontAwesomeIcon icon={faRulerCombined} className="app-icon" />
          <span className="app-title">Measurements</span>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
