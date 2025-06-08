import userPreset from "../models/userPreset.model.js";
import mongoose from "mongoose";

export const getUserPresets = async (req, res) => {
  try {
    const clerkId = req.auth?.userId;

    if (!clerkId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const presets = await userPreset.find({ clerkId });

    const parsedPresets = presets.map((preset) => ({
      _id: preset._id,
      name: preset.name,
      createdAt: preset.createdAt,
      updatedAt: preset.updatedAt,
      isPublished: preset.isPublished,
      sourcePresetId: preset.sourcePresetId,
      settings: JSON.parse(preset.settings.data.toString("utf8")),
      image: `data:${preset.image.contentType};base64,${preset.image.data.toString("base64")}`
    }));

    res.status(200).json({ success: true, data: parsedPresets });
  } catch (error) {
    console.log("Error in fetching user presets:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createUserPreset = async (req, res) => {
  const name = req.body.name;
  const settingsFile = req.files?.settings?.[0];
  const imageFile = req.files?.image?.[0];
  const clerkId = req.auth?.userId;
  const isPublished = req.body.isPublished;
  const sourcePresetId = req.body.sourcePresetId;

  if (!clerkId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  if (!name || !settingsFile || !imageFile || isPublished === undefined) {
      return res.status(400).json({ success: false, message: "Please provide all fields" });
  }

  const newUserPreset = new userPreset({
      name,
      clerkId,
      settings: {
          data: settingsFile.buffer,
          contentType: settingsFile.mimetype,
          originalName: settingsFile.originalname,
      },
      image: {
          data: imageFile.buffer,
          contentType: imageFile.mimetype,
          originalName: imageFile.originalname,
      },
      isPublished,
      sourcePresetId: sourcePresetId || undefined
  });

  try {
      await newUserPreset.save();
      res.status(201).json({ success: true, data: newUserPreset });
  } catch (error) {
      console.error("Error in createUserPreset:", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateUserPreset = async (req,res) => {
  const { id } = req.params;
  const name = req.body.name;
  const settingsFile = req.files?.settings?.[0];
  const imageFile = req.files?.image?.[0];
  const clerkId = req.auth?.userId;
  const isPublished = req.body.isPublished;
  const sourcePresetId = req.body.sourcePresetId;

  if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({ success: false, message: "Invalid preset Id"});
  }

  if (!clerkId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  if (!name || !settingsFile || !imageFile || isPublished === undefined) {
      return res.status(400).json({ success: false, message: "Please provide all fields" });
  }

  const updateFields = {
      name,
      clerkId,
      settings: {
          data: settingsFile.buffer,
          contentType: settingsFile.mimetype,
          originalName: settingsFile.originalname,
      },
      image: {
          data: imageFile.buffer,
          contentType: imageFile.mimetype,
          originalName: imageFile.originalname,
      },
      isPublished,
      sourcePresetId: sourcePresetId || undefined
  };

  try {
      const updatedUserPreset = await userPreset.findByIdAndUpdate(id, updateFields, {new:true});
      res.status(200).json({ success: true, data: updatedUserPreset });
  } catch (error) {
      res.status(500).json({ success: false, message: "Server Error" });
  }
};