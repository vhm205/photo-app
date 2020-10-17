const mongoose = require("mongoose");

const PhotoSchema = new mongoose.Schema({
  title: { type: String },
  image: { type: String, required: true },
  type: { type: String, default: "BABY" },
  status: { type: Boolean, default: true },
  createdAt: { type: Number, default: Date.now() },
  updatedAt: { type: Date, default: null },
});

module.exports = mongoose.model("Photo", PhotoSchema);
