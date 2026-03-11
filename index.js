// require("dotenv").config();
// const connectDB = require("./src/config/db");
// const { PORT } = require("./src/config/env");

// (async function () {
//   console.log("Connecting to database...");
//   await connectDB();
//   console.log;
//   const app = require("./src/app");
//   //   app.listen(process.env.PORT, () => console.log(`Server running on port ${PORT}`));
// })();
require("dotenv").config();

const connectDB = require("./src/config/db");
const app = require("./src/app");

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
