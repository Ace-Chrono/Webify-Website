import express from "express";
import { createPreset, deletePreset, getPreset, getPresets, updatePreset } from "../controllers/preset.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getPresets);
router.get("/:id", getPreset);
router.post(
    '/',
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'settings', maxCount: 1 }
    ]),
    createPreset
);
router.put(
    "/:id",  
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'settings', maxCount: 1 }
    ]),
    updatePreset
);
router.delete("/:id", deletePreset);

export default router;