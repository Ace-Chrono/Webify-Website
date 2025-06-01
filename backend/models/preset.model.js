import mongoose from "mongoose";

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

const Preset = mongoose.model('Preset', presetSchema);

export default Preset;