const multer = require("multer");

// Use memory storage for direct upload to Cloudinary
const storage = multer.memoryStorage();

module.exports = multer({ storage });