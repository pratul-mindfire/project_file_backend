const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
   // _id: Number,
    name: { type: String, required: true },
    description: String
  },
  { timestamps: true }
);
schema.index({ createdAt: -1 });

module.exports = mongoose.model("Project", schema);
