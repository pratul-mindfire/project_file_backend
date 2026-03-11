const connectDB = require("../config/db");
const app = require("../app");

let isConnected = false;

module.exports = async (req, res) => {
  try {
    if (!isConnected) {
      console.log("Connecting to MongoDB...");
      await connectDB();
      console.log("MongoDB connected");
      isConnected = true;
    }

    return app(req, res);
  } catch (error) {
    console.error("Server Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
