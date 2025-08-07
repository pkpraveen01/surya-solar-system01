const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "suryaVisionDB", // Optional: explicitly use a DB name if not in URI
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ DB connection failed:", error.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
