// File: backend/server.js

const express = require("express");
const cors = require("cors");
const client = require("./db.js");

const app = express();
const port = 5001;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// This variable will hold our database connection
let db;

// --- Helper function to generate the next Job ID (e.g., K0001) ---
async function generateNextJobId() {
  const lastJob = await db
    .collection("jobs")
    .findOne({}, { sort: { job_id: -1 } });
  if (!lastJob || !lastJob.job_id) {
    return "J0001";
  }
  const lastIdNumber = parseInt(lastJob.job_id.substring(1), 10);
  const nextIdNumber = lastIdNumber + 1;
  const nextJobId = `J${String(nextIdNumber).padStart(4, "0")}`;
  return nextJobId;
}

// --- Main Server Function ---
async function startServer() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB Atlas!");
    db = client.db("erp_db");

    // --- API ROUTES ---

    // --- CUSTOMER ROUTES ---
    app.get("/api/customers", async (req, res) => {
      try {
        const customers = await db.collection("customers").find({}).toArray();
        res.json(customers);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
        res.status(500).json({ message: "Failed to fetch customers" });
      }
    });

    app.post("/api/customers", async (req, res) => {
      // --- DIAGNOSTIC LOG ---
      console.log("--- BACKEND: Received POST /api/customers request ---");
      console.log("Request body:", req.body);
      // --- END DIAGNOSTIC LOG ---

      try {
        const customerData = req.body;
        const newCustomer = {
          ...customerData,
          createdAt: new Date().toISOString(),
        };
        const result = await db.collection("customers").insertOne(newCustomer);
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
    app.get("/api/jobs", async (req, res) => {
      try {
        const jobs = await db.collection("jobs").find({}).toArray();
        res.json(jobs);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        res.status(500).json({ message: "Failed to fetch jobs" });
      }
    });

    app.post("/api/jobs", async (req, res) => {
      try {
        const jobData = req.body;
        const newJobId = await generateNextJobId();
        const newJob = {
          job_id: newJobId,
          ...jobData,
          createdAt: new Date().toISOString(),
        };
        const result = await db.collection("jobs").insertOne(newJob);
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
    app.listen(port, () => {
      console.log(`Backend server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to the database", err);
    process.exit(1);
  }
}

// Call the main function to start everything
startServer();
