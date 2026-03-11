const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const projectRoutes = require("./project.routes");

// Mount authentication routes
router.use("/auth", authRoutes);
router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
// Mount project-related routes
router.use("/projects", projectRoutes);

module.exports = router;
