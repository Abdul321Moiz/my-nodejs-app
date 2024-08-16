const express = require("express");
const dotenv = require("dotenv").config(); // Ensure environment variables are loaded at the start
const connectDB = require("./config/dbConnection"); // Function to connect to the database
const errorHandler = require("./middleware/errorHandler"); // Custom error handler middleware

const app = express();
const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Route handlers
app.use("/api/contacts", require("./routes/contactRoutes")); // Contacts routes
app.use("/api/users", require("./routes/userRoutes")); // User routes

// Global error handler
app.use(errorHandler);

// Starting the server
app.listen(port, () => {
    console.log(`🚀 Server running on port: ${port}`);
});
