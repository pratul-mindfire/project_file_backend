const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true
    },
    name: String,
    path: String,
    mimeType: String,
    resource_type: String,
    size: Number,
    checksum: String,
    isOutput: { type: Boolean, default: false }
  },
  { timestamps: true }
);

schema.index({ projectId: 1, createdAt: -1 });

module.exports = mongoose.model("File", schema);
