// utils/multer.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "surya_solar_inquiries",
    allowed_formats: ["jpg", "jpeg", "png", "pdf"],
  },
});

const parser = multer({ storage });

module.exports = parser;
