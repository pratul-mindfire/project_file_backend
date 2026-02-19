const express = require("express");
const routes = require("./routes");
const errorMiddleware = require("./middlewares/error.middleware");
const { PORT } = require("./config/env");

const app = express();

app.use(express.json());
app.use("/api", routes);
app.use(errorMiddleware);

// app.listen(process.env.PORT, () =>
//    console.log(`Server running on port ${PORT}`))
module.exports = app;