// File: src/pages/Dashboard.js

import React from "react";
// --- THIS IS THE NEW IMPORT ---
import dashboardBgImage from "../large20.png"; // Import the image with a relative path

function Dashboard() {
  // Create an inline style object whose only job is to set the CSS variable.
  // The '--bg-image' name is a custom name we just invented.
  const styleWithCssVar = {
    "--bg-image": `url(${dashboardBgImage})`,
  };

  return (
    // We apply the 'page-content' class and a NEW 'dashboard-background' class.
    // We also apply the inline style to pass the variable to our CSS.
    <div className="page-content dashboard-background" style={styleWithCssVar}>
      <h2>Welcome to Your Dashboard</h2>
      <p>
        This is the main entry point for your ERP. From here you can navigate to
        different modules.
      </p>
    </div>
  );
}

export default Dashboard;
