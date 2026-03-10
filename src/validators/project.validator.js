const { body, param } = require("express-validator");

exports.createProjectValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Project name is required")
    .isLength({ min: 3 })
    .withMessage("Project name must be at least 3 characters"),

  body("description").optional().isString().withMessage("Description must be a string"),
];

exports.getProjectValidator = [
  param("projectId")
    .notEmpty()
    .withMessage("Project ID is required")
    .isMongoId()
    .withMessage("Invalid project ID"),
];

exports.updateProjectValidator = [
  param("projectId").isMongoId().withMessage("Invalid project ID"),

  body("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Project name must be at least 3 characters"),

  body("description").optional().isString().withMessage("Description must be a string"),
];

exports.deleteProjectValidator = [param("projectId").isMongoId().withMessage("Invalid project ID")];
