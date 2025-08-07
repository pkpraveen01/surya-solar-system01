const Inquiry = require("../models/Inquiry");
const cloudinary = require("../config/cloudinary");

const handleInquiry = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "surya_vision_inquiries",
      });

      imageUrl = result.secure_url; // Cloudinary URL
    }

    const newInquiry = await Inquiry.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      caNumber: req.body.caNumber,
      electricityBill: imageUrl, // ✅ Save Cloudinary URL here
    });

    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
      data: newInquiry
    });
  } catch (error) {
    console.error("Error in inquiry submission:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
