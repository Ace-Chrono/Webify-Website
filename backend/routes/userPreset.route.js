import express from "express";
import upload from "../middleware/upload.js";
import { createUserPreset, getUserPreset, getUserPresets, updateUserPreset, deleteUserPreset } from "../controllers/userPreset.controller.js";
import requireAuth from "../middleware/clerkAuth.js";

const router = express.Router();

router.get("/", requireAuth, getUserPresets);
router.get("/:id", requireAuth, getUserPreset);
router.post(
    '/',
    requireAuth,
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'settings', maxCount: 1 }
    ]),
    createUserPreset
);
router.put(
    "/:id", 
    requireAuth, 
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'settings', maxCount: 1 }
    ]),
    updateUserPreset
);
router.delete("/:id", requireAuth, deleteUserPreset);

export default router;
