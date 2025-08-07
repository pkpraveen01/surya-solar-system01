// Load environment variables from .env
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Routes
const inquiryRoutes = require("./routes/inquiryRoutes");
const adminRoutes = require("./routes/adminRoutes"); // ✅ Admin login + creation routes

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // ✅ Allow frontend origin
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Serve uploaded electricity bills
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/admin", adminRoutes); // ✅ Admin endpoints

module.exports = app;
