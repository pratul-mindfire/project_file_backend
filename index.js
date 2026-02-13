require("dotenv").config();
const connectDB = require("./src/config/db");
connectDB();

( async function() {
   await connectDB();
   const app = require("./src/app");
})()
