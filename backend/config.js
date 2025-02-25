const { Pool } = require("pg");
require("dotenv").config();

// PostgreSQL Connection Pool
const pool = new Pool({
  user: process.env.DB_user,
  host: process.env.DB_host,
  password: process.env.DB_password, // Change this
  database: process.env.DB_databaseName, // Change this
  port: 5432, // Default PostgreSQL port
});

pool
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ Connection error", err));

module.exports = pool; // Export the pool for use in other files
