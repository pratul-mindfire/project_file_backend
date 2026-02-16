const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
   // _id: Number,
    name: { type: String, required: true },
    description: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", schema);
