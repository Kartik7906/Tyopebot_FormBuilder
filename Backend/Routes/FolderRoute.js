const express = require("express");
const router = express.Router();
const Folder = require("../Model/FolderSchema");
const User = require("../Model/UserSchema");

// POST /createfolder
router.post("/createfolder", async (req, res) => {
  try {
    const { title, userId } = req.body;

    if (!title || !userId) {
      return res.status(400).json({ error: "Folder name and userId are required" });
    }

    // Create a new folder
    const newFolder = new Folder({
      title: title,
      user: userId,
    });

    await newFolder.save();

    // Update the user's folders array
    await User.findByIdAndUpdate(userId, { $push: { folders: newFolder._id } });

    return res.status(201).json({
      message: "Folder created successfully",
      folder: newFolder,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create folder" });
  }
});

// GET /getUserFolders/:userId
router.get("/getUserFolders/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all folders associated with this user and populate forms
    const userFolders = await Folder.find({ user: userId }).populate("forms");

    if (!userFolders) {
      return res.status(404).json({ error: "No folders found for this user" });
    }

    return res.status(200).json({
      message: "Folders fetched successfully",
      folders: userFolders,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch user folders" });
  }
});

// DELETE /deletefolder/:folderId
router.delete("/deletefolder/:folderId", async (req, res) => {
  try {
    const { folderId } = req.params;
    const { userId } = req.query;

    if (!folderId || !userId) {
      return res.status(400).json({ error: "folderId and userId are required" });
    }

    // Check if the folder belongs to the user
    const folder = await Folder.findOne({ _id: folderId, user: userId });
    if (!folder) {
      return res.status(404).json({ error: "Folder not found or unauthorized access" });
    }

    // Delete the folder
    await Folder.findByIdAndDelete(folderId);

    // Remove the folder reference from the user's folders array
    await User.findByIdAndUpdate(userId, { $pull: { folders: folderId } });

    return res.status(200).json({ message: "Folder deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to delete folder" });
  }
});

module.exports = router;
