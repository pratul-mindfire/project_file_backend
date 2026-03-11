const { param, body } = require("express-validator");

// Validate projectId
exports.projectIdValidator = [
  param("projectId")
    .notEmpty()
    .withMessage("Project ID is required")
    .isMongoId()
    .withMessage("Project ID must be a string"),
];

// Validate jobId
exports.jobIdValidator = [
  param("jobId")
    .notEmpty()
    .withMessage("Job ID is required")
    .isMongoId()
    .withMessage("Job ID must be a string"),
];

// Validate fileIds for create job
exports.createJobValidator = [
  body("fileIds")
    .notEmpty()
    .withMessage("fileIds is required")
    .isArray({ min: 1 })
    .withMessage("fileIds must be a non-empty array"),

  body("fileIds.*")
    .notEmpty()
    .withMessage("Each fileId must be provided")
    .isMongoId()
    .withMessage("fileId must be a string"),
];
