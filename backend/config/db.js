import mongoose from "mongoose";

let presetDB;
let userPresetDB;

export const connectDB = async () => {
  try {
    presetDB = await mongoose.createConnection(process.env.MONGO_URI);
    userPresetDB = await mongoose.createConnection(process.env.MONGO_URI_2);

     // Log when connection is open and db name available
    presetDB.once('open', () => {
      console.log('Preset DB connected to:', presetDB.name || presetDB.db.databaseName);
    });

    userPresetDB.once('open', () => {
      console.log('UserPreset DB connected to:', userPresetDB.name || userPresetDB.db.databaseName);
    });
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export const getPresetDB = () => presetDB;
export const getUserPresetDB = () => userPresetDB;