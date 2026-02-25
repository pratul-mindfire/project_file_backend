/**
 * Authentication routes
 * Defines endpoints for user registration, login, and logout
 */

const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

// Protected routes - require valid JWT token
router.get("/profile", authMiddleware, authController.getProfile);

module.exports = router;
