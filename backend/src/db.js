// File: backend/db.js

const { MongoClient } = require("mongodb");
require("dotenv").config();

const connectionString = process.env.ATLAS_URI;

// Create a new MongoClient instance with the connection string
const client = new MongoClient(connectionString);

// Export the configured client
module.exports = client;
