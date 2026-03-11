require("dotenv").config();
const connectDB = require("./src/config/db");
const { PORT } = require("./src/config/env");

(async function () {
  console.log("Connecting to database...");
  await connectDB();
  console.log;
  const app = require("./src/app");
  //   app.listen(process.env.PORT, () => console.log(`Server running on port ${PORT}`));
})();
