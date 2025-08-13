// File: backend/src/api/customerRoutes.js

const express = require("express");
const router = express.Router();

/**
 * Creates and configures the router for all customer-related API endpoints.
 * @param {Db} db - The connected MongoDB database instance.
 * @returns {Router} The configured Express router.
 */
module.exports = function (db) {
  // GET /api/customers
  // Fetches all customer documents from the database.
  router.get("/", async (req, res) => {
    try {
      const customers = await db.collection("customers").find({}).toArray();
      res.json(customers);
    } catch (error) {
      // Log the specific error for debugging, but send a generic message to the client.
      console.error("Failed to fetch customers:", error);
      res.status(500).json({ message: "Error fetching customer data." });
    }
  });

  // POST /api/customers
  // Creates a new customer record.
  router.post("/", async (req, res) => {
    try {
      // Add server-generated fields to the client-provided data.
      const newCustomer = {
        ...req.body,
        createdAt: new Date().toISOString(),
      };

      const result = await db.collection("customers").insertOne(newCustomer);

      // Fetch and return the newly created document. This ensures the client gets
      // the final state, including the database-generated _id.
      const createdCustomer = await db
        .collection("customers")
        .findOne({ _id: result.insertedId });

      res.status(201).json(createdCustomer);
    } catch (error) {
      console.error("Failed to add customer:", error);
      res.status(500).json({ message: "Error creating customer." });
    }
  });

  // The configured router is returned to be used by the main application.
  return router;
};
