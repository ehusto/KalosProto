// File: backend/server.js

const express = require("express");
const cors = require("cors");
const client = require("./db.js"); // Your database connection client

const app = express();
const port = 5001;

// --- Middleware ---
// These must come before your routes
app.use(cors());
app.use(express.json());

// This variable will hold the database connection object
let db;

// --- Main Server Function ---
// This function connects to the database and then starts the web server
async function startServer() {
  try {
    // 1. Connect to the MongoDB cluster
    await client.connect();
    console.log("Successfully connected to MongoDB Atlas!");

    // 2. Select the database to use. Make sure 'erp_db' is your correct database name.
    db = client.db("erp_db");

    // --- API ROUTES ---

    // --- CUSTOMER ROUTES ---

    // GET all customers
    app.get("/api/customers", async (req, res) => {
      try {
        // Ensure 'customers' is the correct name of your collection
        const customers = await db.collection("customers").find({}).toArray();
        res.json(customers);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
        res.status(500).json({ message: "Failed to fetch customers" });
      }
    });

    // POST a new customer
    app.post("/api/customers", async (req, res) => {
      try {
        const newCustomer = req.body;
        // Ensure 'customers' is the correct name of your collection
        const result = await db.collection("customers").insertOne(newCustomer);
        // Find the full document we just created to get its _id
        const createdCustomer = await db
          .collection("customers")
          .findOne({ _id: result.insertedId });
        res.status(201).json(createdCustomer);
      } catch (error) {
        console.error("Failed to add customer:", error);
        res.status(500).json({ message: "Failed to add customer" });
      }
    });

    // --- JOB ROUTES ---

    // GET all jobs
    app.get("/api/jobs", async (req, res) => {
      try {
        // Ensure 'jobs' is the correct name of your collection
        const jobs = await db.collection("jobs").find({}).toArray();
        res.json(jobs);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        res.status(500).json({ message: "Failed to fetch jobs" });
      }
    });

    // POST a new job
    app.post("/api/jobs", async (req, res) => {
      try {
        const newJob = req.body;
        // Ensure 'jobs' is the correct name of your collection
        const result = await db.collection("jobs").insertOne(newJob);
        // Find the full document we just created to get its _id
        const createdJob = await db
          .collection("jobs")
          .findOne({ _id: result.insertedId });
        res.status(201).json(createdJob);
      } catch (error) {
        console.error("Failed to add job:", error);
        res.status(500).json({ message: "Failed to add job" });
      }
    });

    // --- Start Listening ---
    // 3. Start the Express server only AFTER the database connection is successful
    app.listen(port, () => {
      console.log(`Backend server is running on http://localhost:${port}`);
    });
  } catch (err) {
    // If the database connection fails, log the error and exit
    console.error("Failed to connect to the database", err);
    process.exit(1);
  }
}

// Call the main function to start everything
startServer();
