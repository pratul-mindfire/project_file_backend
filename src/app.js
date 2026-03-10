const express = require("express");
const routes = require("./routes");
const errorMiddleware = require("./middlewares/error.middleware");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use(errorMiddleware);
module.exports = app;
