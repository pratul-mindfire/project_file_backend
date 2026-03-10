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

exports.filesUploadValidator = (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No files provided",
    });
  }

  next();
};
