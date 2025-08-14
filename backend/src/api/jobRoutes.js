// File: backend/src/api/jobRoutes.js (This is the file you need to fix)

const express = require("express");
const { ObjectId } = require("mongodb");
const { generateNextId } = require("../utils/idGenerator");
const router = express.Router();

// This is the wrapper function that fixes the error.
module.exports = function (db) {
  // GET /api/jobs
  router.get("/", async (req, res) => {
    try {
      const jobs = await db.collection("jobs").find({}).toArray();
      res.json(jobs);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      res.status(500).json({ message: "Error fetching job data." });
    }
  });

  // POST /api/jobs
  router.post("/", async (req, res) => {
    try {
      const jobData = req.body;
      const newJobId = await generateNextId(db, "jobs", "K", "job_id");
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
          await db
            .collection("rfqs")
            .updateOne(
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
      // This is the block you pasted. It's inside the route handler.
      console.error("Failed to add job:", error);
      res.status(500).json({ message: "Error creating job." });
    }
  });

  // PUT /api/jobs/:id
  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      if (Object.keys(updates).length === 0)
        return res.status(400).json({ message: "No update fields provided." });
      const result = await db
        .collection("jobs")
        .updateOne({ _id: new ObjectId(id) }, { $set: updates });
      if (result.matchedCount === 0)
        return res.status(404).json({ message: "Job not found." });
      res.status(200).json({ message: "Job updated successfully." });
    } catch (error) {
      console.error("Failed to update job:", error);
      res.status(500).json({ message: "Error updating job." });
    }
  });

  // This returns the configured router at the end of the function.
  return router;
};
