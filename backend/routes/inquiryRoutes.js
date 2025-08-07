const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");

const Inquiry = require("../models/Inquiry");

// 🟢 POST: Submit an inquiry with electricity bill upload
router.post("/", upload.single("electricityBill"), async (req, res) => {
  try {
    const { name, email, phone, address, caNumber } = req.body;

    let electricityBillUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "surya_vision_inquiries",
      });
      electricityBillUrl = result.secure_url; // ✅ Cloudinary URL
    }

    const newInquiry = new Inquiry({
      name,
      email,
      phone,
      address,
      caNumber,
      electricityBill: electricityBillUrl, // ✅ Save URL to DB
    });

    await newInquiry.save();

    res.status(200).json({ message: "Inquiry submitted successfully" });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// 🟢 GET: Fetch all inquiries (for admin dashboard)
router.get("/all", async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(inquiries);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch inquiries" });
  }
});





router.delete("/:id", async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete inquiry" });
  }
});


module.exports = router;
