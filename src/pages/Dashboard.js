// File: src/pages/Dashboard.js

import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css"; // <-- Import our new stylesheet

// 1. Import the main Font Awesome component and the specific icons we want to use
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import {
  faUsers,
  faClipboardList,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  return (
    // We use the global 'page-content' class and the dashboard-background theme
    <div className="page-content dashboard-background">
      {/* This is our new grid container */}
      <div className="dashboard-grid">
        {/* --- App Icon 1: Customers --- */}
        <Link to="/customers" className="dashboard-app-link">
          {/* We render the FontAwesomeIcon component with the 'faUsers' icon */}
          <FontAwesomeIcon icon={faUsers} className="app-icon" />
          <span className="app-title">Customers</span>
        </Link>

        {/* --- App Icon 2: Jobs --- */}
        <Link to="/jobs" className="dashboard-app-link">
          {/* We render the FontAwesomeIcon component with the 'faClipboardList' icon */}
          <FontAwesomeIcon icon={faClipboardList} className="app-icon" />
          <span className="app-title">Jobs</span>
        </Link>

        {/* --- App Icon 3: Calender --- */}
        <Link to="/calendar" className="dashboard-app-link">
          <FontAwesomeIcon icon={faCalendarAlt} className="app-icon" />
          <span className="app-title">Calendar</span>
        </Link>

        {/* --- Add More App Icons Here as You Build More Modules --- */}
        {/* 
        <Link to="/inventory" className="dashboard-app-link">
          <FontAwesomeIcon icon={faBoxOpen} className="app-icon" />
          <span className="app-title">Inventory</span>
        </Link>
        */}
      </div>
    </div>
  );
}

export default Dashboard;
