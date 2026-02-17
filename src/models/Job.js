const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", index: true },
  type: { type: String, enum: ["ZIP_COMPRESSION"] },
  status: { 
    type: String, 
    enum: ["PENDING", "PROCESSING", "COMPLETED", "FAILED"],
    default: "PENDING",
    index: true
  },
  progress: { type: Number, default: 0 },
  fileIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
  outputFileId: { type: mongoose.Schema.Types.ObjectId, ref: "File" },
  error: String
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);