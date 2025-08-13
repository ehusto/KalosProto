// File: backend/src/api/rfqRoutes.js

const express = require("express");
const { ObjectId } = require("mongodb");
const { generateNextId } = require("../utils/idGenerator"); // Import our reusable ID generator
const router = express.Router();

/**
 * Creates and configures the router for all RFQ-related API endpoints.
 * @param {Db} db - The connected MongoDB database instance.
 * @returns {Router} The configured Express router.
 */
module.exports = function (db) {
  // POST /api/rfqs
  // Creates a new RFQ document.
  router.post("/", async (req, res) => {
    try {
      const newRfqId = await generateNextId(db, "rfqs", "RFQ", "rfq_id");

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
      res.status(500).json({ message: "Error creating RFQ." });
    }
  });

  // GET /api/rfqs
  // Fetches all RFQs, with an option to filter for archived RFQs.
  router.get("/", async (req, res) => {
    try {
      // The default query fetches only active (non-archived) RFQs.
      let query = { isArchived: false };

      // If the client sends a query parameter like ?status=archived, modify the query.
      if (req.query.status === "archived") {
        query = { isArchived: true };
      }

      const rfqs = await db.collection("rfqs").find(query).toArray();
      res.json(rfqs);
    } catch (error) {
      console.error("Failed to fetch RFQs:", error);
      res.status(500).json({ message: "Error fetching RFQ data." });
    }
  });

  // GET /api/rfqs/:id
  // Fetches a single RFQ by its database _id.
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const rfq = await db
        .collection("rfqs")
        .findOne({ _id: new ObjectId(id) });

      if (!rfq) {
        return res.status(404).json({ message: "RFQ not found." });
      }

      res.json(rfq);
    } catch (error) {
      console.error("Failed to fetch RFQ:", error);
      res.status(500).json({ message: "Error fetching RFQ." });
    }
  });

  // PUT /api/rfqs/:id
  // Updates the status or archive state of an RFQ.
  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { status, isArchived } = req.body;
      const updateDoc = { $set: {} };

      // Dynamically build the update document based on the fields provided.
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

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "RFQ not found." });
      }

      res.status(200).json({ message: "RFQ updated successfully." });
    } catch (error) {
      console.error("Failed to update RFQ:", error);
      res.status(500).json({ message: "Error updating RFQ." });
    }
  });

  return router;
};
