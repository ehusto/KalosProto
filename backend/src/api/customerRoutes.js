// File: backend/src/api/customerRoutes.js (Corrected)
const express = require("express");
const router = express.Router();

// This wrapper function is the key fix.
module.exports = function (db) {
  router.get("/", async (req, res) => {
    try {
      const customers = await db.collection("customers").find({}).toArray();
      res.json(customers);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      res.status(500).json({ message: "Failed to fetch customers" });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const newCustomer = { ...req.body, createdAt: new Date().toISOString() };
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

  // The router is now returned from inside the function.
  return router;
};
