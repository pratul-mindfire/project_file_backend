const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    // Reference to file owner (User) - for security and filtering
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    description: String,
  },
  { timestamps: true }
);
schema.index({ createdAt: -1 });

module.exports = mongoose.model("Project", schema);
