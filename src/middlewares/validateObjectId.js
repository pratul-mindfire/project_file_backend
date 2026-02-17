const mongoose = require("mongoose");

module.exports = (req, res, next) => {
  const ids = Object.values(req.params);

  for (const id of ids) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid ID format"
      });
    }
  }

  next();
};