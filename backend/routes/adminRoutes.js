const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
require("dotenv").config();

// CREATE NEW ADMIN
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existing = await Admin.findOne({ username });
    if (existing) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    const newAdmin = new Admin({ username, password });
    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ADMIN LOGIN - Supports both .env and DB-based admins
router.post("/login", async (req, res) => {
  const { adminId, adminPassword } = req.body;

  // Try .env admin
  if (
    adminId === process.env.ADMIN_ID &&
    adminPassword === process.env.ADMIN_PASSWORD
  ) {
    res.cookie("adminToken", "verified", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "Login successful (.env admin)" });
  }

  // Try DB admin
  try {
    const dbAdmin = await Admin.findOne({ username: adminId });
    if (!dbAdmin) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(adminPassword, dbAdmin.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    res.cookie("adminToken", "verified", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login successful (DB admin)" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
  });

  return res.json({ message: "Logged out successfully" });
});

// VERIFY ADMIN AUTH
router.get("/verify", (req, res) => {
  const token = req.cookies.adminToken;

  if (token === "verified") {
    return res.status(200).json({ isAdmin: true });
  }

  return res.status(401).json({ isAdmin: false });
});

module.exports = router;
