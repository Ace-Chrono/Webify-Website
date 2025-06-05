import mongoose from "mongoose";
import { getPresetDB } from "../config/db.js";

const presetSchema = new mongoose.Schema({
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
    }
}, {
    timestamps: true
});

const Preset = getPresetDB().model('Preset', presetSchema);

export default Preset;