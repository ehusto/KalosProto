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

async function generateNextMeasurementId() {
  const lastMeasurement = await db
    .collection("measurements")
    .findOne({}, { sort: { measurement_id: -1 } });
  if (!lastMeasurement || !lastMeasurement.measurement_id) {
    return "M0001";
  }
  const lastIdNumber = parseInt(
    lastMeasurement.measurement_id.substring(1),
    10
  );
  const nextIdNumber = lastIdNumber + 1;
  return `M${String(nextIdNumber).padStart(4, "0")}`;
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
        const newJobId = await generateNextJobId();
        const newJob = {
          job_id: newJobId,
          ...jobData,
          status: "Scheduled",
          createdAt: new Date().toISOString(),
        };

        const result = await db.collection("jobs").insertOne(newJob);
        const createdJob = await db
          .collection("jobs")
          .findOne({ _id: result.insertedId });

        if (jobData.originating_rfq_id) {
          const originalRfq = await db
            .collection("rfqs")
            .findOne({ rfq_id: jobData.originating_rfq_id });
          if (originalRfq) {
            await db.collection("rfqs").updateOne(
              { _id: originalRfq._id },
              {
                $set: {
                  status: "Job Created",
                  associated_job_id: newJobId,
                  associated_job_db_id: createdJob._id,
                },
              }
            );

            const jobMeasurement = await db
              .collection("measurements")
              .findOne({ associated_rfq_id: originalRfq._id.toString() });
            if (jobMeasurement) {
              await db
                .collection("measurements")
                .updateOne(
                  { _id: jobMeasurement._id },
                  { $set: { associated_job_id: newJobId } }
                );
            }
          }
        }

        res.status(201).json(createdJob);
      } catch (error) {
        console.error("Failed to add job:", error);
        res.status(500).json({ message: "Failed to add job" });
      }
    });

    app.put("/api/jobs/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const updates = req.body;
        if (Object.keys(updates).length === 0)
          return res
            .status(400)
            .json({ message: "No update fields provided." });
        const result = await db
          .collection("jobs")
          .updateOne({ _id: new ObjectId(id) }, { $set: updates });
        if (result.matchedCount === 0)
          return res.status(404).json({ message: "Job not found." });
        res.status(200).json({ message: "Job updated successfully." });
      } catch (error) {
        console.error("Failed to update job:", error);
        res.status(500).json({ message: "Failed to update job" });
      }
    });

    // --- RFQ ROUTES ---
    app.post("/api/rfqs", async (req, res) => {
      try {
        const newRfqId = await generateNextRfqId();
        const newRfq = {
          rfq_id: newRfqId,
          ...req.body,
          status: "Draft",
          isArchived: false,
          createdAt: new Date().toISOString(),
        };
        const result = await db.collection("rfqs").insertOne(newRfq);
        const createdRfq = await db
          .collection("rfqs")
          .findOne({ _id: result.insertedId });
        res.status(201).json(createdRfq);
      } catch (error) {
        console.error("Failed to add RFQ:", error);
        res.status(500).json({ message: "Failed to add RFQ" });
      }
    });

    app.get("/api/rfqs", async (req, res) => {
      try {
        let query = { isArchived: false };
        if (req.query.status === "archived") {
          query = { isArchived: true };
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
        if (!rfq) return res.status(404).json({ message: "RFQ not found." });
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
        if (Object.keys(updateDoc.$set).length === 0)
          return res.status(400).json({ message: "No update field provided." });
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

    // --- MEASUREMENT ROUTES ---
    app.post("/api/measurements", async (req, res) => {
      try {
        const newMeasurementId = await generateNextMeasurementId();
        const newMeasurement = {
          measurement_id: newMeasurementId,
          ...req.body,
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

    app.post("/api/measurements/:id/calculate-bom", async (req, res) => {
      try {
        const { id } = req.params;
        const measurement = await db
          .collection("measurements")
          .findOne({ _id: new ObjectId(id) });
        if (!measurement)
          return res.status(404).json({ message: "Measurement not found." });

        const bom = [];
        const wasteFactor = 1.15;
        const totalShinglesSqFt = measurement.roof_area_sqft * wasteFactor;
        bom.push({
          item: "Shingle Bundles",
          quantity: Math.ceil(totalShinglesSqFt / 33.3),
          unit: "bundles",
        });
        const starterNeededFt = measurement.eaves_ft;
        bom.push({
          item: "Starter Shingles",
          quantity: Math.ceil(starterNeededFt / 100),
          unit: "bundles",
        });
        const ridgeCapNeededFt = measurement.ridges_ft + measurement.hips_ft;
        bom.push({
          item: "Ridge Cap Shingles",
          quantity: Math.ceil(ridgeCapNeededFt / 33),
          unit: "bundles",
        });
        const nailBoxes = Math.ceil(measurement.roof_area_sqft / 1000);
        bom.push({
          item: "Roofing Nails",
          quantity: nailBoxes,
          unit: "box(es)",
        });

        await db
          .collection("measurements")
          .updateOne(
            { _id: new ObjectId(id) },
            { $set: { billOfMaterials: bom } }
          );
        res.status(200).json(bom);
      } catch (error) {
        console.error("Failed to calculate BOM:", error);
        res.status(500).json({ message: "Failed to calculate BOM" });
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
