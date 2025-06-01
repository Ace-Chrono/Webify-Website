import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import presetRoutes from "./routes/preset.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //Allows us to accept JSON data in the req.body

app.use("/api/presets", presetRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT)
});