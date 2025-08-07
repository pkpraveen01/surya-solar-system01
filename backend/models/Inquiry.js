const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  caNumber: String,
  electricityBill: String,  // Save uploaded file path or URL
}, {
  timestamps: true  // ✅ Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model("Inquiry", inquirySchema);
