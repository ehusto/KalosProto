// File: src/components/Dashboard.js

import React from "react";

function Dashboard() {
  // Create a style object for our component's background
  const dashboardStyle = {
    padding: "20px",
    height: "calc(100vh - 60px)", // Calculate height: 100% of viewport height minus the navbar height (60px)

    // --- BACKGROUND STYLES START HERE ---

    // Set the image. The URL is relative to the 'public' folder.
    backgroundImage: `url('large20.png')`,

    // Center the background image
    backgroundPosition: "center",

    // Make the image cover the entire container without stretching weirdly
    backgroundSize: "contain",

    // Prevent the image from tiling if it's small
    backgroundRepeat: "no-repeat",

    // Optional: Add a semi-transparent overlay so text on top is still readable
    // We do this by adding a second background layer (a gradient) on top of the image.
    // Uncomment the line below to see the effect.
    // backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url('/company-logo-bg.png')`,
  };

  return (
    // Apply the style object to the main div
    <div style={dashboardStyle}>
      <h2>Welcome to Your Dashboard</h2>
      <p>
        This is the main entry point for your ERP. From here you can navigate to
        different modules.
      </p>
    </div>
  );
}

export default Dashboard;
