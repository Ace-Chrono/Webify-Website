import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); // wait for DB connections to be ready

    // Import routes after DB connected (if they import models that use DB)
    const presetRoutes = (await import("./routes/preset.route.js")).default;
    const userPresetRoutes = (await import("./routes/userPreset.route.js")).default;

    app.use(express.json());

    app.use("/api/presets", presetRoutes);
    app.use("/api/userpresets", userPresetRoutes);

    app.listen(PORT, () => {
      console.log("Server started at http://localhost:" + PORT);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();