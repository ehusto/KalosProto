// File: backend/src/server.js

// --- Core Imports ---
const express = require("express");
const cors = require("cors");
const client = require("./db.js"); // Your original database client import

// --- Application Setup ---
const app = express();
const port = process.env.PORT || 5001; // Use environment variable or default

// --- Global Middleware ---
app.use(cors());
app.use(express.json());

// This variable will hold the database connection once established.
let db;

/**
 * The main startup function for the application.
 * It establishes a database connection and then starts the Express server.
 */
async function startServer() {
  try {
    // --- Database Connection ---
    // Establish the connection to the MongoDB Atlas cluster.
    await client.connect();
    console.log("Successfully connected to MongoDB Atlas!");

    // Assign the database instance ('erp_db') to our global 'db' variable.
    // This instance will be passed to all our route modules.
    db = client.db("erp_db");

    // ===================================================================
    // --- API Route Registration ---
    // This section is now the "table of contents" for your entire API.
    // Each line imports a router, passes the 'db' connection to it,
    // and mounts it on the appropriate URL path.
    // ===================================================================

    // Mount the Customer routes
    const customerRoutes = require("./api/customerRoutes")(db);
    app.use("/api/customers", customerRoutes);

    // Mount the Job routes
    const jobRoutes = require("./api/jobRoutes")(db);
    app.use("/api/jobs", jobRoutes);

    // Mount the RFQ routes
    const rfqRoutes = require("./api/rfqRoutes")(db);
    app.use("/api/rfqs", rfqRoutes);

    // Mount the Measurement routes
    const measurementRoutes = require("./api/measurementRoutes")(db);
    app.use("/api/measurements", measurementRoutes);

    // --- Server Listener ---
    // Start the Express server, making it listen for incoming requests on the specified port.
    app.listen(port, () => {
      console.log(`Backend server is running on http://localhost:${port}`);
    });
  } catch (err) {
    // If any error occurs during startup (e.g., database connection fails),
    // log the error and terminate the process to prevent an unstable state.
    console.error("Fatal: Failed to start the server.", err);
    process.exit(1);
  }
}

// --- Application Start ---
// Call the main function to start the entire application.
startServer();
