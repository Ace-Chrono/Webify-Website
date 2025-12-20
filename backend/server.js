import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "https://webify-website.vercel.app"] // allow your frontend
}));

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); // wait for DB connections to be ready

    // Import routes after DB connected (if they import models that use DB)
    const presetRoutes = (await import("./routes/preset.route.js")).default;
    const userPresetRoutes = (await import("./routes/userPreset.route.js")).default;

    app.use(express.json());

    app.get("/health", async (req, res) => {
      try {
        // Ping MongoDB to keep connection active
        await mongoose.connection.db.admin().ping();
        
        res.status(200).json({ 
          status: "ok", 
          message: "Server is running",
          database: "connected",
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        res.status(503).json({ 
          status: "error", 
          message: "Database connection issue",
          timestamp: new Date().toISOString()
        });
      }
    });

    app.head("/health", async (req, res) => {
      try {
        await mongoose.connection.db.admin().ping();
        res.status(200).end();
      } catch (error) {
        res.status(503).end();
      }
    });

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