const express = require("express");
const router = express.Router();
const upload = require("../utils/file.utils");

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
const { projectIdValidator, fileIdValidator } = require("../validators/file.validator");
const { createJobValidator, jobIdValidator } = require("../validators/job.validator");

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
  projectIdValidator,
  validate,
  upload.array("files"),
  fileController.uploadFiles
);

router.get("/:projectId/files", projectIdValidator, validate, fileController.getProjectFiles);

router.delete("/:projectId/files/:fileId", fileIdValidator, validate, fileController.deleteFile);

router.get(
  "/:projectId/files/:fileId/download",
  [...projectIdValidator, ...fileIdValidator],
  validate,
  fileController.downloadFile
);

/* Job APIs */
router.post("/:projectId/jobs/zip", createJobValidator, validate, jobController.createJob);

router.get(
  "/:projectId/jobs/:jobId",
  [...projectIdValidator, ...jobIdValidator],
  validate,
  jobController.getJob
);
router.get("/:projectId/jobs", projectIdValidator, validate, jobController.getJobs);

module.exports = router;
