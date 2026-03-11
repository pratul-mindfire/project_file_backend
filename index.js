const connectDB = require("./src/config/db");
const { PORT } = require("./src/config/env");

(async function () {
  await connectDB();
  const app = require("./src/app");
  app.listen(process.env.PORT, () => console.log(`Server running on port ${PORT}`));
})();
