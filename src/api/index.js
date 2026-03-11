require("dotenv").config();

const connectDB = require("../config/db");
const app = require("../app");

let isConnected = false;

module.exports = async (req, res) => {
  try {
    if (!isConnected) {
      console.log("Connecting to database...");
      await connectDB();
      console.log("Database connected successfully");
      isConnected = true;
    }

    return app(req, res);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
