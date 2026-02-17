const express = require("express");
const router = express.Router();
const upload = require("../utils/file.utils");
const validateObjectId = require("../middlewares/validateObjectId");

const projectController = require("../controllers/project.controller");
const fileController = require("../controllers/file.controller");
const jobController = require("../controllers/job.controller");

/* Project APIs */
router.post("/projects", projectController.createProject);
router.get("/projects/:projectId", validateObjectId, projectController.getProject);
router.get("/projects", projectController.getProject);
router.put("/projects/:projectId", validateObjectId, projectController.updateProject);
router.delete("/projects/:projectId", validateObjectId, projectController.deleteProject);

/* File APIs */
router.post(
  "/projects/:projectId/files",
  validateObjectId,
  upload.array("files"),
  fileController.uploadFiles
);

router.get(
  "/projects/:projectId/files",
  validateObjectId,
  fileController.listFiles
);

router.delete(
  "/projects/:projectId/files/:fileId",
  validateObjectId,
  fileController.deleteFile
);

router.get(
  "/projects/:projectId/files/:fileId/download",
  validateObjectId,
  fileController.downloadFile
);

/* Job APIs */
router.post(
  "/projects/:projectId/jobs/zip",
  validateObjectId,
  jobController.createZipJob
);

router.get(
  "/projects/:projectId/jobs/:jobId",
  validateObjectId,
  jobController.getJobStatus
);

module.exports = router;