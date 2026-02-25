/**
 * Authentication middleware
 * Verifies JWT token and protects routes from unauthorized access
 */

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

/**
 * Verify JWT token and attach user data to request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const authMiddleware = (req, res, next) => {
  try {
    // Extract token from Authorization header (Bearer <token>)
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided. Please login first.",
      });
    }

    // Verify and decode token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user ID to request object for use in controllers
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
