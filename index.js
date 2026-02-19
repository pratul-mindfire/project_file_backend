const connectDB = require("./src/config/db");
connectDB();

( async function() {
   const app = require("./src/app");
})()
