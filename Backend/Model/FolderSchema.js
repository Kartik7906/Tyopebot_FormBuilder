const mongoose = require("mongoose");

const FolderSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Name of the folder
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User schema
  forms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Form" }], // List of forms in the folder
  createdAt: { type: Date, default: Date.now }, // Timestamp for folder creation
});

module.exports = mongoose.model("Folder", FolderSchema);
