const { param } = require("express-validator");

// validate projectId
exports.projectIdValidator = [
  param("projectId")
    .notEmpty()
    .withMessage("Project ID is required")
    .isMongoId()
    .withMessage("Project ID must be a string"),
];

// validate fileId
exports.fileIdValidator = [
  param("fileId")
    .notEmpty()
    .withMessage("File ID is required")
    .isMongoId()
    .withMessage("File ID must be a string"),
];
