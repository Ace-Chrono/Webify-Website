import Preset from '../models/preset.model.js';
import mongoose from "mongoose";

export const getPresets = async (req,res) => {
    try {
        const presets = await Preset.find({});
        const parsedPresets = presets.map((preset) => ({
            _id: preset._id,
            name: preset.name,
            createdAt: preset.createdAt,
            updatedAt: preset.updatedAt,
            settings: JSON.parse(preset.settings.data.toString('utf8')),
            image: `data:${preset.image.contentType};base64,${preset.image.data.toString('base64')}`
        }));

        res.status(200).json({ success: true, data: parsedPresets});
    } catch (error) {
        console.log("Error in fetching presets:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getPreset = async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid preset Id"});
    }

    try {
        const preset = await Preset.findById(id);

        if (!preset) {
            return res.status(404).json({ success: false, message: 'Preset not found' });
        }

        const parsedPreset = {
            _id: preset._id,
            name: preset.name,
            createdAt: preset.createdAt,
            updatedAt: preset.updatedAt,
            settings: JSON.parse(preset.settings.data.toString('utf8')),
            image: `data:${preset.image.contentType};base64,${preset.image.data.toString('base64')}`
        };

        res.status(200).json({ success: true, data: parsedPreset });
    } catch (error) {
        console.log("Error in fetching preset:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createPreset = async (req, res) => {
    const name = req.body.name;
    const settingsFile = req.files?.settings?.[0];
    const imageFile = req.files?.image?.[0];

    console.log(name);
    console.log(settingsFile);
    console.log(imageFile);

    if (!name || !settingsFile || !imageFile) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newPreset = new Preset({
        name,
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
    });

    try {
        await newPreset.save();
        res.status(201).json({ success: true, data: newPreset });
    } catch (error) {
        console.error("Error in createPreset:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updatePreset = async (req,res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid preset Id"});
    }

    try {
        const updateFields = {};

        if (req.body.name) updateFields.name = req.body.name;

        if (req.files?.settings && req.files.settings.length > 0) {
            updateFields.settings = {
                data: req.files.settings[0].buffer,
                contentType: req.files.settings[0].mimetype,
                originalName: req.files.settings[0].originalname
            };
        }

        if (req.files?.image && req.files.image.length > 0) {
            updateFields.image = {
                data: req.files.image[0].buffer,
                contentType: req.files.image[0].mimetype,
                originalName: req.files.image[0].originalname
            };
        }

        const updatedPreset = await Preset.findByIdAndUpdate(id, updateFields, {new:true});
        res.status(200).json({ success: true, data: updatedPreset });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deletePreset = async (req,res) => {
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid preset Id"});
    }
    
    try {
        await Preset.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Preset deleted" });
    } catch (error) {
        console.log("Error in deleting product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};