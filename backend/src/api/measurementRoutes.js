// File: backend/src/api/measurementRoutes.js

const express = require("express");
const { ObjectId } = require("mongodb");
const { generateNextId } = require("../utils/idGenerator");
const router = express.Router();

/**
 * Creates and configures the router for all Measurement-related API endpoints.
 * @param {Db} db - The connected MongoDB database instance.
 * @returns {Router} The configured Express router.
 */
module.exports = function (db) {
  // POST /api/measurements
  // Creates a new measurement document.
  router.post("/", async (req, res) => {
    try {
      const newMeasurementId = await generateNextId(
        db,
        "measurements",
        "M",
        "measurement_id"
      );

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
      res.status(500).json({ message: "Error creating measurement." });
    }
  });

  // GET /api/measurements
  // Fetches all measurement documents.
  router.get("/", async (req, res) => {
    try {
      const measurements = await db
        .collection("measurements")
        .find({})
        .toArray();
      res.json(measurements);
    } catch (error) {
      console.error("Failed to fetch measurements:", error);
      res.status(500).json({ message: "Error fetching measurement data." });
    }
  });

  // POST /api/measurements/:id/calculate-bom
  // Calculates the Bill of Materials for a given measurement and saves it.
  router.post("/:id/calculate-bom", async (req, res) => {
    try {
      const { id } = req.params;
      const measurement = await db
        .collection("measurements")
        .findOne({ _id: new ObjectId(id) });

      if (!measurement) {
        return res.status(404).json({ message: "Measurement not found." });
      }

      // NOTE: This business logic is a prime candidate for a "Service" layer in a future refactor.
      const bom = [];
      const wasteFactor = 1.15; // 15% waste

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

      const nailBoxes = Math.ceil(measurement.roof_area_sqft / 1000); // Simple nail calculation
      bom.push({ item: "Roofing Nails", quantity: nailBoxes, unit: "box(es)" });

      // Save the calculated BOM back to the measurement document.
      await db
        .collection("measurements")
        .updateOne(
          { _id: new ObjectId(id) },
          { $set: { billOfMaterials: bom } }
        );

      // Return the calculated BOM to the client.
      res.status(200).json(bom);
    } catch (error) {
      console.error("Failed to calculate BOM:", error);
      res.status(500).json({ message: "Error calculating BOM." });
    }
  });

  return router;
};
