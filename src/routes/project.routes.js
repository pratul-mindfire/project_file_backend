const express = require("express");
const router = express.Router();
const upload = require("../utils/file.utils");
const validateObjectId = require("../middlewares/validateObjectId");

const projectController = require("../controllers/project.controller");
const fileController = require("../controllers/file.controller");
const jobController = require("../controllers/job.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  createProjectValidator,
  getProjectValidator,
  updateProjectValidator,
  deleteProjectValidator,
} = require("../validators/project.validator");
const { validate } = require("../middlewares/validate.middleware");

// Apply authentication middleware to all project routes
router.use(authMiddleware);

/* Project APIs */
router.post("/", createProjectValidator, validate, projectController.createProject);
router.get("/:projectId", getProjectValidator, validate, projectController.getProject);
router.get("/", projectController.getProjects);
router.put("/:projectId", updateProjectValidator, validate, projectController.updateProject);
router.delete("/:projectId", deleteProjectValidator, validate, projectController.deleteProject);
/* File APIs */
router.post(
  "/:projectId/files",
  validateObjectId,
  upload.array("files"),
  fileController.uploadFiles
);

router.get("/:projectId/files", validateObjectId, fileController.getProjectFiles);

router.delete("/:projectId/files/:fileId", validateObjectId, fileController.deleteFile);

router.get("/:projectId/files/:fileId/download", validateObjectId, fileController.downloadFile);

/* Job APIs */
router.post("/:projectId/jobs/zip", validateObjectId, jobController.createJob);

router.get("/:projectId/jobs/:jobId", validateObjectId, jobController.getJob);
router.get("/:projectId/jobs", validateObjectId, jobController.getJobs);

module.exports = router;
