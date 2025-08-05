// File: src/pages/Dashboard.js

import React from "react";

function Dashboard() {
  return (
    // We apply two CSS classes to this div:
    // 1. "page-content": A general class from App.css that gives padding and correct height to all pages.
    // 2. "dashboard-background": The specific theme class from App.css that applies our faded logo background.
    <div className="page-content dashboard-background">
      <h2>Welcome to Your Dashboard</h2>
      <p>
        This is the main entry point for your ERP. From here you can navigate to
        different modules.
      </p>
    </div>
  );
}

export default Dashboard;
