// File: backend/server.js

const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const client = require("./db.js");

const app = express();
const port = 5001;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// This variable will hold our database connection
let db;

// --- Helper Functions ---
async function generateNextJobId() {
  const lastJob = await db
    .collection("jobs")
    .findOne({}, { sort: { job_id: -1 } });
  if (!lastJob || !lastJob.job_id) {
    return "K0001";
  }
  const lastIdNumber = parseInt(lastJob.job_id.substring(1), 10);
  const nextIdNumber = lastIdNumber + 1;
  return `K${String(nextIdNumber).padStart(4, "0")}`;
}

async function generateNextRfqId() {
  const lastRfq = await db
    .collection("rfqs")
    .findOne({}, { sort: { rfq_id: -1 } });
  if (!lastRfq || !lastRfq.rfq_id) {
    return "RFQ0001";
  }
  const lastIdNumber = parseInt(lastRfq.rfq_id.substring(3), 10);
  const nextIdNumber = lastIdNumber + 1;
  return `RFQ${String(nextIdNumber).padStart(4, "0")}`;
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
      try {
        const newCustomer = {
          ...req.body,
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
        if (jobData.originating_rfq_id) {
          const originalRfq = await db
            .collection("rfqs")
            .findOne({ rfq_id: jobData.originating_rfq_id });
          if (originalRfq) {
            await db
              .collection("rfqs")
              .updateOne(
                { _id: originalRfq._id },
                { $set: { status: "Job Created" } }
              );
          }
        }
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

    // --- RFQ ROUTES ---
    app.post("/api/rfqs", async (req, res) => {
      console.log("BACKEND: Received POST /api/rfqs request"); // DEBUG
      try {
        const rfqData = req.body;
        const newRfqId = await generateNextRfqId();
        const newRfq = {
          rfq_id: newRfqId,
          ...rfqData,
          status: "Draft",
          isArchived: false,
          createdAt: new Date().toISOString(),
        };
        console.log("BACKEND: Inserting new RFQ:", newRfq); // DEBUG
        const result = await db.collection("rfqs").insertOne(newRfq);
        const createdRfq = await db
          .collection("rfqs")
          .findOne({ _id: result.insertedId });
        res.status(201).json(createdRfq);
      } catch (error) {
        console.error("BACKEND: Failed to add RFQ:", error);
        res.status(500).json({ message: "Failed to add RFQ" });
      }
    });

    // --- THIS IS THE CORRECTED GET ROUTE ---
    app.get("/api/rfqs", async (req, res) => {
      try {
        let query = {};
        // If the URL asks for archived items, search where isArchived is true
        if (req.query.status === "archived") {
          query = { isArchived: true };
        } else {
          // Otherwise, for the "active" list, search where isArchived is false
          query = { isArchived: false };
        }
        const rfqs = await db.collection("rfqs").find(query).toArray();
        res.json(rfqs);
      } catch (error) {
        console.error("Failed to fetch RFQs:", error);
        res.status(500).json({ message: "Failed to fetch RFQs" });
      }
    });

    app.get("/api/rfqs/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const rfq = await db
          .collection("rfqs")
          .findOne({ _id: new ObjectId(id) });
        if (!rfq) return res.status(404).json({ message: "RFQ not found" });
        res.json(rfq);
      } catch (error) {
        console.error("Failed to fetch RFQ:", error);
        res.status(500).json({ message: "Failed to fetch RFQ" });
      }
    });

    app.put("/api/rfqs/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const { status, isArchived } = req.body;
        const updateDoc = { $set: {} };

        if (status) {
          updateDoc.$set.status = status;
        }
        if (typeof isArchived === "boolean") {
          updateDoc.$set.isArchived = isArchived;
        }

        if (Object.keys(updateDoc.$set).length === 0) {
          return res.status(400).json({ message: "No update field provided." });
        }

        const result = await db
          .collection("rfqs")
          .updateOne({ _id: new ObjectId(id) }, updateDoc);
        if (result.matchedCount === 0)
          return res.status(404).json({ message: "RFQ not found." });
        res.status(200).json({ message: "RFQ updated successfully." });
      } catch (error) {
        console.error("Failed to update RFQ status:", error);
        res.status(500).json({ message: "Failed to update RFQ status" });
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

startServer();
