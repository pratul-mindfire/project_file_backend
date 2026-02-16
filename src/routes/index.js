const express = require("express");
const router = express.Router();

const projectRoutes = require("./project.routes");

router.use("/", projectRoutes);

module.exports = router;