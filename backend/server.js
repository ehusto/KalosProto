// File: backend/server.js

const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const client = require("./db.js");

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

let db;

// --- Helper Functions ---
async function generateNextJobId() {
  /* ... */
}
async function generateNextRfqId() {
  /* ... */
}
async function generateNextMeasurementId() {
  /* ... */
}

// --- Main Server Function ---
async function startServer() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB Atlas!");
    db = client.db("erp_db");

    // --- API ROUTES ---
    // ... (All Customer, Job, and RFQ routes are the same and correct) ...
    app.put("/api/rfqs/:id", async (req, res) => {
      /* ... */
    });

    // --- MEASUREMENT ROUTES ---
    app.post("/api/measurements", async (req, res) => {
      try {
        const measurementData = req.body;
        const newMeasurementId = await generateNextMeasurementId();
        const newMeasurement = {
          measurement_id: newMeasurementId,
          ...measurementData,
          createdAt: new Date().toISOString(),
        };
        const result = await db
          .collection("measurements")
          .insertOne(newMeasurement);
        const createdMeasurement = await db
          .collection("measurements")
          .findOne({ _id: result.insertedId });
        res.status(201).json(createdMeasurement);
      } catch (error) {
        console.error("Failed to add measurement:", error);
        res.status(500).json({ message: "Failed to add measurement" });
      }
    });

    // --- THIS IS THE NEW ROUTE ---
    app.get("/api/measurements", async (req, res) => {
      try {
        const measurements = await db
          .collection("measurements")
          .find({})
          .toArray();
        res.json(measurements);
      } catch (error) {
        console.error("Failed to fetch measurements:", error);
        res.status(500).json({ message: "Failed to fetch measurements" });
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
