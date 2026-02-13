const express = require("express");
const router = express.Router();

const {
  createProject,
  getAllProject,
  getProject,
  updateProject,
  deleteProject
} = require("../controllers/project.controller");

/**
 * @route   POST /api/projects
 * @desc    Create new project
 */
router.post("/", createProject);

/**
 * @route   GET /api/projects
 * @desc    Get All project details (with file & job counts)
 */
router.get("/", getAllProject);

/**
 * @route   GET /api/projects/:id
 * @desc    Get project details (with file & job counts)
 */
router.get("/:id", getProject);

/**
 * @route   PUT /api/projects/:id
 * @desc    Update project
 */
router.put("/:id", updateProject);

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete project (cascade delete files & jobs)
 */
router.delete("/:id", deleteProject);

module.exports = router;
