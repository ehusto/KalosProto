// File: backend/server.js

const express = require("express");
const cors = require("cors");
const client = require("./db.js"); // Your database connection client

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// This variable will hold our database connection object
let db;

async function startServer() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB Atlas!");
    db = client.db("erp_db"); // Sets the 'db' variable for all routes to use

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
        const customerData = req.body;

        const newCustomer = {
          ...customerData,
          createdAt: new Date().toISOString(), // Add the new 'createdAt' timestamp
        };

        // --- THIS IS THE CORRECTION ---
        // We use the 'db' variable that is already defined in this scope.
        // We do NOT need to call dbo.getDb().
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
      // ... your GET jobs logic will use the 'db' variable here too
    });

    // POST a new job
    app.post("/api/jobs", async (req, res) => {
      try {
        // 1. Get the job data sent from the React form
        const jobData = req.body;

        // --- THIS IS THE NEW PART ---
        // 2. Create a new object with the form data AND the new timestamp
        const newJob = {
          ...jobData,
          createdAt: new Date().toISOString(),
        };

        // 3. Insert the complete newJob object into the database
        const result = await db.collection("jobs").insertOne(newJob);

        // 4. Find the full document we just created to send back
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
