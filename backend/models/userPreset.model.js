import mongoose from "mongoose";
import { getUserPresetDB } from "../config/db.js";

const userPresetSchema = new mongoose.Schema({
    name: String,
    settings: {
        data: Buffer,
        contentType: String,
        originalName: String
    },
    image: {
        data: Buffer,
        contentType: String,
        originalName: String
    },
    clerkId: String,
    isPublished: { 
        type: Boolean, 
        default: false 
    },
    sourcePresetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Preset",
    }
}, {
    timestamps: true
});

const userPreset = getUserPresetDB().model('userPreset', userPresetSchema);

export default userPreset;